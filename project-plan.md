The prototype and the ui design of this project is under website-prototype directory at project root.
What I want you to do is:
Set up a Next.js project in the root with TypeScript.
Then go thorough the website prototype and create the exact page structure with exact ui design.
Remember the site's visuals and capabilities (such as language support) must be identical to prototype, 
The site must be seo friendly via both metadata tags and server side render props.
Create a docker file and two docker composes one as docker compose dev and other one is docker compose prod.
While docker compose prod containerizes both the app and the postgresql db; docker compose dev going co containerize only the db.
The tech you will be using is going to be TypeScript, PrismaORM, and Zod, unlike the prototypes drizzle orm implementation.
The project doesn't have a admin panel in prototype, but I want you to create one with keeping the same design language.
You will find the pages that are reading content from the db and creating dynamic props based on that.
Use Next.js /api directory backend endpoint capabilities to create internal backend.
Use Zod for end to end data shape validation.