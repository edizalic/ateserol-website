-- Shared categories: courses, reflections, and library resources
-- all point at CourseCategory through join tables.

CREATE OR REPLACE FUNCTION _slugify_category(input text) RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  s text := coalesce(input, '');
BEGIN
  s := replace(s, 'İ', 'i');
  s := replace(s, 'I', 'i');
  s := replace(s, 'ı', 'i');
  s := lower(s);
  s := replace(s, 'ş', 's');
  s := replace(s, 'ğ', 'g');
  s := replace(s, 'ü', 'u');
  s := replace(s, 'ö', 'o');
  s := replace(s, 'ç', 'c');
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  IF s IS NULL OR s = '' THEN
    s := 'category';
  END IF;
  RETURN left(s, 60);
END;
$$;

-- CreateTable
CREATE TABLE "_CategoryToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToCourse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToReflection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToReflection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToLibraryResource" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToLibraryResource_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToCourse_B_index" ON "_CategoryToCourse"("B");

-- CreateIndex
CREATE INDEX "_CategoryToReflection_B_index" ON "_CategoryToReflection"("B");

-- CreateIndex
CREATE INDEX "_CategoryToLibraryResource_B_index" ON "_CategoryToLibraryResource"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCourse" ADD CONSTRAINT "_CategoryToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToReflection" ADD CONSTRAINT "_CategoryToReflection_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToReflection" ADD CONSTRAINT "_CategoryToReflection_B_fkey" FOREIGN KEY ("B") REFERENCES "Reflection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLibraryResource" ADD CONSTRAINT "_CategoryToLibraryResource_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToLibraryResource" ADD CONSTRAINT "_CategoryToLibraryResource_B_fkey" FOREIGN KEY ("B") REFERENCES "LibraryResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Keep existing course assignments.
INSERT INTO "_CategoryToCourse" ("A", "B")
SELECT "categoryId", "id"
FROM "Course"
WHERE "categoryId" IS NOT NULL
ON CONFLICT DO NOTHING;

-- Turn reflection category text into shared category rows.
WITH src AS (
  SELECT DISTINCT ON (en_name)
    en_name,
    tr_name,
    fr_name
  FROM (
    SELECT
      btrim(category->>'en') AS en_name,
      COALESCE(NULLIF(btrim(category->>'tr'), ''), btrim(category->>'en')) AS tr_name,
      COALESCE(NULLIF(btrim(category->>'fr'), ''), btrim(category->>'en')) AS fr_name
    FROM "Reflection"
    WHERE category IS NOT NULL
      AND btrim(COALESCE(category->>'en', '')) <> ''
  ) raw
  ORDER BY en_name
),
numbered AS (
  SELECT
    en_name,
    tr_name,
    fr_name,
    _slugify_category(en_name) AS base_slug,
    row_number() OVER (PARTITION BY _slugify_category(en_name) ORDER BY en_name) AS rn
  FROM src
  WHERE NOT EXISTS (
    SELECT 1 FROM "CourseCategory" c WHERE c.name->>'en' = src.en_name
  )
)
INSERT INTO "CourseCategory" ("id", "slug", "name", "createdAt", "updatedAt")
SELECT
  'mig_' || substr(md5('reflection:' || en_name), 1, 24),
  CASE
    WHEN rn > 1 OR EXISTS (SELECT 1 FROM "CourseCategory" c WHERE c.slug = base_slug)
    THEN base_slug || '-' || substr(md5(en_name), 1, 6)
    ELSE base_slug
  END,
  jsonb_build_object('en', en_name, 'tr', tr_name, 'fr', fr_name),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM numbered;

INSERT INTO "_CategoryToReflection" ("A", "B")
SELECT c.id, r.id
FROM "Reflection" r
JOIN "CourseCategory" c ON c.name->>'en' = btrim(r.category->>'en')
WHERE r.category IS NOT NULL
  AND btrim(COALESCE(r.category->>'en', '')) <> ''
ON CONFLICT DO NOTHING;

-- Turn library category text into the same shared rows.
WITH src AS (
  SELECT DISTINCT btrim(category) AS en_name
  FROM "LibraryResource"
  WHERE btrim(COALESCE(category, '')) <> ''
),
numbered AS (
  SELECT
    en_name,
    _slugify_category(en_name) AS base_slug,
    row_number() OVER (PARTITION BY _slugify_category(en_name) ORDER BY en_name) AS rn
  FROM src
  WHERE NOT EXISTS (
    SELECT 1 FROM "CourseCategory" c WHERE c.name->>'en' = src.en_name
  )
)
INSERT INTO "CourseCategory" ("id", "slug", "name", "createdAt", "updatedAt")
SELECT
  'mig_' || substr(md5('library:' || en_name), 1, 24),
  CASE
    WHEN rn > 1 OR EXISTS (SELECT 1 FROM "CourseCategory" c WHERE c.slug = base_slug)
    THEN base_slug || '-' || substr(md5(en_name), 1, 6)
    ELSE base_slug
  END,
  jsonb_build_object('en', en_name, 'tr', en_name, 'fr', en_name),
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM numbered;

INSERT INTO "_CategoryToLibraryResource" ("A", "B")
SELECT c.id, r.id
FROM "LibraryResource" r
JOIN "CourseCategory" c ON c.name->>'en' = btrim(r.category)
WHERE btrim(COALESCE(r.category, '')) <> ''
ON CONFLICT DO NOTHING;

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_categoryId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "LibraryResource" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "category";

DROP FUNCTION _slugify_category(text);
