interface Report {
    _id: string;
    _idReporter: string; // Changed to string for simple ID handling
    reason: string;
    reportDate: string;
    status: string;
}

export interface Article {
    _id: string;
    createdBy: {
        _id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        avt: { link: string }[];
    };
    content: string;
    totalLikes: number;
    totalComments: number;
    reports: Report[];
    listPhoto?: { link: string; _id: string }[]; // Optional for photos
}