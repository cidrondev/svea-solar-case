To run:
- npm install
- npm run dev

Assumptions:
- The bill and roofsize is not sensitive information
- User want to share the page with others
- Co2 and savings calculations are mock calculations
- Api does not have any signficant delay

Design choices:
- Shadcn for light and modular component library
- zod to make form validation easier
- Tailwind to write clean html css code
- Using querys and pages to not clear state while reloading, makes it easier for user to share pages.

To fix:
- Clean the code
- Split up the code into smaller components
- Remove repeated code
- Look over variable names
- Make validation more specific for each field
- Add a theme to the application
- Add constant files and path files
