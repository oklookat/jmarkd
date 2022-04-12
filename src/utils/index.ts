export default class Utils {

    /** set first character of string to uppercase */
    public static firstCharToUpper(val: string): string {
        return val.charAt(0).toUpperCase() + val.slice(1)
    }
    
}