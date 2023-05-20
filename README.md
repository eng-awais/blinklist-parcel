# Blinklist-parcel A/B testing

# How to setup

- unzip the file
- install necessary packages by running command `npm install`
- To start app, use command: `npx parcel index.html`

# Depdencies

- Node LTS version
- parcel (you can install it globally by command `npm i -g parcel` or it can be installed as dev dependency)
- install nanoid using `npm i nanoid`

# Description

- There are two variations of content for now but can be added as much needed e.g. ["Control", "Test"]

- Firstly, users id and article id is calculated through **getCurrentVisitorId** and **getCurrentArticleId**.

- Assuming that **getCurrentVisitorId** function will return user that is verified from backend or just did signup.

- Having the visitor Id and article Id, Store the unique impression and calculate a variation and store it in local storage

- In case, visitor Id and article Id exist in localstorage, article id is fetched and same article is rendered to user.

-Variation can be consistent for the user even many times they come.

- **assignVariation** function is helping us to calculate the variation and, then **renderVariation** function is used to render the article.

- Whenever the person clicks on the SignUp button, the event will be tracked and CTR will be calculated.

- At the end **determineWinningVariation** function will find the maximum CTR of the variation using the formula:

`CTR = number of unique impressions / number of signup events`


# Brief explanation about all the key points

**_Thought process_**:

- Examined the specifications, presumptions, and provided files.
- develop a mechanism for offering variations to visitors.
- Render variation (Unique visitor storing strategy).

**_Assumptions and Rationable behind decisions_**

- Assuming that unique id is generated from frontend side and upon signup, it is sent on backend to create user instance..
- Assuming backend storage of unique visitor impressions and signup clicks to calculate CTR.

**_Tradeoffs, Problems, and Limitations_**

- Managing and maintaining the A/B testing logic within the frontend coding can be challenging as in case user clear local-storage or cleans cache, its id and variation record will vainsh out.
- When compared to employing specialized A/B testing tools, doing statistical analysis to ascertain the statistical significance of test findings may be more difficult when using frontend-only A/B testing.
- Without a server-side component, tracking across several devices might be difficult for same user as another browser or device can lead same user to another variation.
- A/B testing may only be applicable to a single page or article, and expanding the testing across several pages or application flows may not present the wanted results.                                                                               

**_Ideas for improvements_**

- Take into account including additional capabilities like multivariate testing or segmenting visitors based on user attributes or behaviours. These features can enhance the testing process and offer deeper insights into user behaviour.
- Offer same user with different variation after sometime like (if he visitors after 2-3 days) can bring better results based on their multivariation experience.
