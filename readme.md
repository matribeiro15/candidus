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



<!-- CONTACT -->
## Contact

Please tell me how you liked the submission. You can reach me on Twitter or on [dev.to](https://dev.to/tqbit)


Mail: [tobi@q-bit.me](mailto:tobi@q-bit.me) - Twitter: [@qbitme](https://twitter.com/qbitme)

Project Link: [https://github.com/tq-bit/ghost-notifier](https://github.com/tq-bit/ghost-notifier)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: assets/images/ghost-notifier-update.gif



# Development

Development is done in a Docker container. Clone the repos and type


```bash
docker-compose up
```

## Configure Email

To configure email, use the following:

1. In Docker env file:

Enter the following environment variables in docker compose:
```yaml
      url: http://localhost:2368
      NODE_ENV: 'development'
      mail__transport: 'SMTP'
      mail__from: 'Tobi <tobi@q-bit.me>'
      mail__options__service: 'SMTP'
      mail__options__host: 'smtppro.zoho.eu'
      mail__options__port: '465'
      mail__options__secure: 'true'
      mail__options__auth__user: 'tobi@q-bit.me'
      mail__options__auth__pass: 'X:3k[Ve(|JGJC-ch'
```

2. In GhostMailer.js

in /var/lib/ghost/versions/v/core/server/services/mail

Replace the `createMessage` function with this:

```js
function createMessage(message) {
	const encoding = 'base64';
	const generateTextFromHTML = !message.forceTextContent;
	return Object.assign({}, message, {
		from: 'Tobi <tobi@q-bit.me>',
		generateTextFromHTML,
		encoding,
	});
}
```

# User customization

## Difference between Plugins and modules

- Modules are for base functions of the theme
- Plugins use the `window.CANDIDUS` object to allow user customized

Modules and plugins both depend on the same base class `Control`. `Plugin`, besides checking for the necessary UI Elements for its logic, will also check if the author has injected the necessary plugin object.

## Add reading bar

```js
<script>
window.CANDIDUS = {
  SHOW_POST_READING_BAR: true,
}
</script>
```

## Add additional social accounts

The following icons are available as part of the `socialicons` partial. This partial must be injected into the body tag.

- Facebook
- Twitter
- Instagram
- LinkedIn
- Youtube
- GitHub
- Pinterest

Additional icons can then be added using head injection into the global Plugin Object:

+ Source for icons: https://simpleicons.org/ + https://css.gg

```html
<script>
window.CANDIDUS = {
  SOCIAL_ACCOUNTS: [
    {
      title: "Linkedin",
      slug: "linkedin",
      url: "https://linkedin.com"
    },
    {
      title: "Github",
      slug: "github",
      url: "https://github.com"
    }
  ]
}
</script>
```

## Use secondary navigation for social networks



# Styling

## Core

> Everything that provides resources to other modules

### Variables

> See [/src/style/core/variables.scss](https://github.com/tq-bit/candidus/blob/master/content/themes/candidus/src/style/core/variables.scss)

#### Current screen settings

These screen sizes are used for breakpoints and showing / hiding elements for certain device types

```scss
$lg-screen-size: 1200px;
$md-screen-size: 992px;
$sm-screen-size: 767px;
$xs-screen-size: 575px;
```

#### Current color settings

The following colors are currently used for colors:

```scss
var(--color-primary): #3f4d63;
var(--color-secondary): #f7c59f;
$color-accent-dark: #bdc5d4;
$color-accent: #e1e5ee;
```

#### Variable groups

- Screen sizes (`xs` for phone, `sm` and `md` for tablets, `lg` for desktop)
- Colors (`primary`, `secondary`, `accent` and some fillers)
- Modifier class postfixes (ranging from `--xxs` to `--xl` )
- Type class postfixes (complementary to `colors`)
- Text sizes ranging from `xs` to `xl`

There are also variables present that control
- The `grid` - system
- Gaps for `padding` and `margin` util classes
- Mapping for elements, colors and sizes

---

### Media Queries

> See [/src/style/core/media-queries.scss](https://github.com/tq-bit/candidus/blob/master/content/themes/candidus/src/style/core/media-queries.scss)

Media queries are implemented as mixins.

```scss
@mixin xl-screen { ... } /* > 1200px  */
@mixin lg-screen { ... } /* <= 1200px */
@mixin md-screen { ... } /* <= 992px  */
@mixin sm-screen { ... } /* <= 767px  */
@mixin xs-screen { ... } /* <= 575px  */
```

They can be applied as a wrapper to screen size specific classes. E.g. to add a class that's hidden on smaller devices:

```scss
@include sm-screen {
  .mobile {
    &--hidden {
      display: none;
    }
  }
}
```

---


## Fonts

Currently used font packages are installed via `npm` and [Fontsource](https://fontsource.org/).

**Installed fonts**:

- @fontsource/oswald@4.5.1
- @fontsource/quattrocento@4.5.0

### Mixins

> See [/src/style/core/mixins.scss](https://github.com/tq-bit/candidus/blob/master/content/themes/candidus/src/style/core/mixins.scss)

#### Currently maintained

- `collection` for lists (no implementation yet)
- `button` for button and button-like text
- `bar` for tool - and navbar elements

#### Mixin groups

##### Rounded

Currently maintained:

- `rounded-sm`
- `rounded-top-sm`
- `rounded-bottom-sm`
- `rounded-md`
- `rounded-top-md`
- `rounded-bottom-md`
- `rounded-bottom-max`

## Layout

> Everything that provides structure to the user interface

## Modules

> Elements that are displayed on the user interface

## State

> Classes that control UI appearance or whether elements are shown

## Licenses

- user.png icon is part of the Font Awesome set and published under the Creative Commons Attribution 4.0 International