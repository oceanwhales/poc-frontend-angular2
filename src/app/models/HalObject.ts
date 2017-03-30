export abstract class HalObject {
    _links?: {
        self: {
            href: string;
        }
    };
    href?: string;
}
