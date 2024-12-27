<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Candidus</h1>

  <p align="center">
    An approachable and minimalistic blogging theme for Ghost
  </p>
  <div align="center">
    <img alt="License" src="https://img.shields.io/github/license/tq-bit/ville-de-cuisines?style=plastic&logo=MIT"/>
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tq-bit/candidus?style=plastic&logo=git"/>
  </div>
</div>

## About the Project

Candidus is the result of several months of careful planning and dedicated work. It's a versatile Ghost theme with a minimalistic and approachable design, but a lot of power under the hood.

Candidus has all the features I wanted my blog to have:

- Bookmarks
- Dark-theme
- Reading indicators
- Built-in support for [Umami Analytics](https://umami.is/)
- Customizable colors

and many more.

Figure something to be missing? Candidus is fully Open Source! You can either hack your own Candidus version or, even better, open a pull request and make the feature available for everybody!

### Built With

- [Handlebars](https://handlebarsjs.com/guide/)
- [Typescript / Javascript](https://www.typescriptlang.org/)
- feat. [Ghost CMS](https://ghost.org/)
- feat [Umami Analytics](https://umami.is/)

## Get started

You can download the latest release [here](https://github.com/tq-bit/candidus/releases/download/latest/candidus.zip)

### Quickstart

1. Upload the `candidus.zip` to your blogging site under https://your-domain.com/ghost/#/settings/design/edit
2. Change the accent color to `#bdc5d4` or
3. Start customizing Candidus to your liking

### Development

1. Fork and clone this repository
2. Run `cd /content/themes/candidus && npm install && cd ../../../`
3. Run `docker compose up`

Docker will start a Webpack development server in watch-mode and a Ghost instance. You can then start developing on the theme by opening `http://localhost:2368` in your browser.

<!-- LICENSE -->
## License

Licensed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

