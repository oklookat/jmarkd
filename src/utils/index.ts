/** set first character of string to uppercase */
export function firstCharToUpper(val: string): string {
    return val.charAt(0).toUpperCase() + val.slice(1)
}