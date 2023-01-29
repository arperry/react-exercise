# React developer take-home exercise

## Instructions

### Overview

- This iteration of the hiring app isn't full fleshed out and the solution is open ended
- The app is contained within `apps/hiring-app-01`
- to run the app run `pnpm start` (note we use pnpm, repo not tested with npm/yarn)

### Tools we use

- Since there is no app shell, you are free to use any libraries/tools/anything you want except the addition of a framework (next/remix)
- The most important libraries we use are:
  - Mantine (UI components)
  - React Hook Library
  - React Router 5
  - React Table
- Using these libraries would be appreciated, but is not required
- Mantine is installed already

### Requirements:

- There is a promise based Mock api in `apps/hiring-app-01/src/api.ts`
- Create a todo app that utilizes this mock api
- The app can be as fully featured as you would like
- While expansive functionality is a bonus, overall architecture, code quality,
  robustness, error handling are the primary qualities judged for
- You can spend as long or as little time as you feel is necessary to do a good job, however please let us know how long you spent.
  Don't include time spent researching/reading docs.
- While there are no strict requirements for the app, multiple routed views would be appreciated

### Other Considerations

- If you find something you think is an error with the app, feel free to fix it and note it for our awareness

## Notes - Jaymi Johnson:

- There's a populated fixture dataset with the todo tasks I completed during this assesment. To view locally - you can adjust the Dashboard.tsx file.

1. comment IN line 21
2. comment OUT line 20, 26-41, and 59

- I spent about ~ 10 hours on this project.

- You will find a few reducer files and a store.ts. My intention when I began this assessment was to use the store to save and manipulate todo items. However, it's been some time since I've used a store as we spoke about and as I was setting it up as I was used to, I started to look into the NEW way to set up reducers. I spent some time learning but ended up not using the store for 2 reasons.

1. I wanted to turn this in ASAP for review.
2. If I'm going to use technology, I want to learn the new and best way to use it. I didn't fully grasp the the new way to implement it here, so I'm going to keep learning in the meantime!

- I added minimal tests, just to showcase my ability. Usually I would create a coverage file and make sure my tests cover about 80%.

#### Things I would add with more time:

1. Test coverage
2. A full set of API calls (with an update/PATCH method).
3. A nicer design and easier user experience ;) with requirements/collaboration with a designer.
4. Setting up the store with react-toolkit.

#### Other References:

1. [react-table examples I built for my previous company](http://student-storybook.develop.student.civitaslearning.com/?path=/story/templates-templates--template-library-tab)

### Thank you!

Thanks again for the time you've spent to get to know me more and to review this PR.
I hope this assessment shows a little more about my skills, and I look forward to working with you!
