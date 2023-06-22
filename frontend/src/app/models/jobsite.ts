export class Jobsite {
        public jobsiteCode: string;
        public jobsiteDesc: string;
        public jobsiteId: number;

        public jobsitestreet: string;
        public streetnumber: string;
        public country: { name: string, value: string, selected: boolean };
        public state: { name: string, value: string, selected: boolean };
        public city: string;
        public zipcode: string;
        public foreman: { name: string, value: string, selected: boolean };
        public progress?: number;
        public collectedloads?: number;
        public totalloads?: number;
        public totalvolume?: number;
        public product: any;   
}
