# **REACT + WEBPACK MODERN BOILERPLATE**

> This repository contains a simple but complete boilerplate, with sass compiler and hot-reloading, to easily and fastly start developing projects from scratch with React 16 and Webpack 4

This project was born mainly to satisfy my desire for knowledge. <br>
Being a curious developer I have always wondered how the "engine" of boilerplate generators worked (especially the famous `create-react-app`) and I realized that the only way to really learn what's "under the hood" is to write a custom tool to retrace step by step all the main features (plus it was a great way to deepen updates released by Webpack 4).

This project is developed following the best practice for React and style (using [OOCSS](http://oocss.org/), [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) and [BEM](http://getbem.com/) methodologies)

---

## **What this boilerplate contains**

<img src="./__repo_readme_assets__/logo-npm.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-yarn.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-es6.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-sass.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-webpack.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-react.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-jest.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-workbox.png" height="55" alt="logo placeholder">&nbsp;&nbsp;
<img src="./__repo_readme_assets__/logo-handlebar.png" height="55" alt="logo placeholder">&nbsp;&nbsp;

#### **Features**

- [x] React 16.4.2
- [x] Webpack 4
- [x] Babel (ES6 and JSX support)
- [x] Sass compiler
- [x] Handlebar compiler
- [x] Html, Js, Css minifier
- [x] Develpment / Production environment ready
- [x] Style linter
- [x] Airbnb javascript linter
- [x] Style and script hot reloading in development mode
- [x] Caching system for production environment
- [x] Pwa integrated system (Google Workbox)
- [x] Routing environment with React-router
- [x] Test environment with Enzyme and Jest

---

## **Set up project**

Before cloning the repo **be sure** you have installed:

- [Node](http://nodejs.org/download/) (version >= 9.10.x), please install NVM and run `nvm use` to have the right node version for the project
- [Yarn](https://yarnpkg.com/en/docs/install) (version >= 1.9.x)
- [Npm](https://www.npmjs.com/) (version >= 6.2.x)
- [Nvm](https://github.com/creationix/nvm) (version >= 0.33.x)

Then:

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder `git clone https://github.com/ibbatta/webpack-modern-boilerplate.git`

---

## **Installation**

To install the project and all dependencies, enter in the project folder and run:

```bash
# install dependencies
npm install
```

or

```bash
# install dependencies
yarn
```

---

## **Run the project**

##### Run the project to develop:

Run the project locally using webpack-dev-server on port 9000 (as default)

```bash
npm start:dev
# or
yarn start:dev
```

##### Run the project to production:

```bash
npm start
#or
yarn start
```

You can change the default port value setting `PORT` in the node env
<br>
ie. `PORT=8080 npm start:dev` or `PORT=8080 yarn start:dev`

##### Run the analyzer for webpack:

```bash
npm analyze
#or
yarn analyze
```

##### Run the tests:

```bash
npm test
#or
yarn test
```

You can add the `--watch` flag if you want keep watching changes for test files.

---

## **What is ITCSS?**

[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) stands for _Inverted Triangle CSS_ and it helps you to organize your project CSS files in such way that you can better deal with (not always easy-to-deal with) CSS specifics like global namespace, cascade and selectors specificity.
<br><br>
ITCSS can be used with preprocessors or without them and is compatible with CSS methodologies like BEM, SMACSS or OOCSS.
<br><br>
One of the key principles of ITCSS is that it separates your CSS codebase to several sections (called layers), which take form of the inverted triangle:

- **Settings**: used with preprocessors and contain font, colors definitions, etc.
- **Tools**: globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
- **Generic**: reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
- **Elements**: styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
- **Objects**: class-based selectors which define undecorated design patterns, for example media object known from OOCSS.
- **Components**: specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components.
- **Utilities**: utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class.

You will find a more complete explanation inside each ITCSS layer in `./app` folder.

---

## **Editor setup**

To keep consistency to the style of resources, I decided to stick to some shared rules that have to be applied to every project using some editors plugins. Plese be sure to disable / remove any other js/jsx linters or custom configurations.

#### Basic Editor Configuration

I chose to use [EditorConfig](http://editorconfig.org/) to share the basic configuration like indentation and charset. It works including an `.editorconfig` file in the root directory and making sure your editor has the necessary plugin. You can find a list of downloads [here](http://editorconfig.org/#download). The choice to keep the indentation with 2 spaces is to be compliant with actual standards (major frameworks use this configuration both for JS and CSS).

#### Auto correction on save

I have chose to use [js-beautify](https://github.com/beautify-web/js-beautify). Despite of his name it works as a beautifier also for HTML and CSS. Every editor has a plugin that implement it, es. [Sublime](https://github.com/victorporof/Sublime-HTMLPrettify), [Atom](https://atom.io/packages/atom-beautify) or [Visual studio](https://www.visualstudio.com/it/?rr=https%3A%2F%2Fwww.google.it%2F). The setup for js-beautify is controlled within a `.jsbeautifyrc` file that have to be included in the root directory of the project (.hbs are not completely supported yet).

#### Eslint

To check on Javascript / React [.js / .jsx] syntax I use [Eslint](http://eslint.org/). The rules to detect errors are written in a `.eslintrc` file included in the root directory of the project (for best practices use `airbnb linter`).

---

## **Todo**

- [x] Add coverage output for tests
- [x] Add snapshots for tests
- [ ] Node + Express server
- [ ] Introduce Redux
- [ ] Define a custom styleguide

---

## **Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

## **Credits**

- [Lubos Kmetko](https://www.xfive.co/blog/author/lubos/) (for the great ITCSS guide)

---

### **Troubleshootings**

This is just a personal project created for study / demonstration purpose only, it may or may not be a good fit for your project(s).

---

> GitHub [@ibbatta](https://github.com/ibbatta) &nbsp;&middot;&nbsp;
> Twitter [@battago](https://twitter.com/battago)
