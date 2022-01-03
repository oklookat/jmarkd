export default class Logger {

    public static log(message: string) {
        this.out('log')(message)
    }

    public static warn(message: string) {
        this.out('warn')(message)
    }

    public static err(message: string) {
        this.out('error')(message)
    }

    private static out(action: 'log' | 'warn' | 'error') {
        return (message: string) => {
            console[action](`[jmarkd] ${message}`)
        }
    }

}