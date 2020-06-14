import { fusebox, sparky } from 'fuse-box'

class Context {
    runServer;
    getConfig = () =>
        fusebox({
            target: 'browser',
            entry: 'src/index.tsx',
            cache: true,
            devServer: this.runServer,
            webIndex: {
                template: "public/index.html"
            }
        })
}

const { task } = sparky<Context>(Context)

task('default', async ctx => {
    ctx.runServer = true
    const fuse = ctx.getConfig()
    await fuse.runDev()
})