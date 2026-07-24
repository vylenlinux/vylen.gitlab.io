declare module "*.njk?raw" {
    const content: string;
    export default content;
}

declare module "*.njk" {
    const content: string;
    export default content;
}
