Once upon a time I wanted to start a simple website project. Actually it was this blog.
I decided it needs to be static, easy to maintain, should support Markdown and I want to build it from ground up to learn some stuff along the way. As you may suspect there is quite a choice of solutions like that and I'm a married man and a young father, so I cannot afford to check all of them out, right?

My first idea was to use [Yeoman](http://yeoman.io/) to scaffold an app using `gulp-webapp` generator. Yo gulp-webapp! Done. Then I added an icon framework and the icons did not get copied to the place I wanted them to, SCSS transpiler was misbehavin' and after another hour spent on the Gulpfile configuration daddy's daily computer time was over. Man, I wanted to start a simple thing, but was buried in the configuration along with the project and I must admit I hate configurating things. Everybody does, right?

I wanted less configuration, more building and support for the new cool web stuff out-of-the-box. And then after some more googling I found [Harp](http://harpjs.com/). Harp among other things is a Node.js-based web server with built-in transpilers for all frontend goodies like template engines (Jade and EJS), CSS preprocessors (SCSS, LESS), Markdown (!), Coffescript and convention-over-configuration approach. It processes your files on the fly and serves as plain old HTML and CSS.

The 3 main Harp commands I use are `init`, `server` and `compile`. Using `init` you can scaffold an empty Harp project using the boilerplate of your choice. The `server` command starts the development server, which I already mentioned and once you are done developing your website you can use the `compile` command to transpile and minify all your shiny project files, so you can put them on a server for people to see.

While all this automation and conventions are nice, yet I quickly missed my gulp tasks and e.g. browser-sync. But all is not lost, because the internet already thought of that - here's the [Gist for a Gulpfile combining browser-sync and Harp server](https://gist.github.com/geelen/a5fcb013de67f680cb8d). You can now have a Gulp accompanying your Harp setup.

To sum up, I think Harp is a great tool for beginners and people, who value the simplicity and ~~are a bit lazy~~ want to quickstart something skipping the misery of initial project configuration. What I can say for sure it's perfect for small projects (like a static blog), but I suspect once you need some more complex work done, then you are probably going to miss Grunt/Gulp flexibility.

As this blog was created using Harp, do not forget to check out [the source](https://github.com/gregolsky/gregolsky.github.io).
