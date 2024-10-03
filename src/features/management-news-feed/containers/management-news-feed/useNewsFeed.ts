import { useState } from "react";
import { Article } from "../../../../interface/interface";

const useNewsFeed = () => {
    const [listArticle, setListArticle]  = useState<Article[]>(sampleArticles);

    const deleteArticle = (articleID: string) => {
        setListArticle(
            listArticle.map((article) =>
              article._id === articleID
                ? { ...article, _destroy: new Date() } 
                : article
            )
        );
    }

    const completeCheckArticle = (articleID: string) => {
        setListArticle(
            listArticle.map((article) =>
              article._id === articleID
                ? {
                    ...article,
                    reports: article.reports.map((report) => ({
                      ...report,
                      status: 'rejected',
                    })),
                  }
                : article
            )
          );
    }

    return {
        listArticle, setListArticle,
        deleteArticle,
        completeCheckArticle
    }
}

export default useNewsFeed;

const sampleArticles: Article[] = [
    {
        _id: '62462628864',
        sharedPostId: null,
        idHandler: 'user001',
        handleDate: null,
        reports: [
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
        ],
        groupID: null,
        content: 'Bài viết đầu tiên của tôi',
        hashTag: [],
        listPhoto: [],
        scope: 'Public',
        interact: {
            _id: '1',
            emoticons: [],
            comment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: null,
        createdBy: "53591573157137"
    },
    {
        _id: '624626288234',
        sharedPostId: null,
        idHandler: 'friend1', // Bài viết của người khác
        handleDate: null,
        reports: [
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "rejected"
            },
        ],
        groupID: '613531573333',
        content: 'Bài viết của bạn',
        hashTag: [],
        listPhoto: [],
        scope: 'Public',
        interact: {
            _id: '2',
            emoticons: [],
            comment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: null,
        createdBy: "53591573157137"
    },
    {
        _id: '62462628866',
        sharedPostId: null,
        idHandler: 'user001',
        handleDate: null,
        reports: [
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "processed"
            },
            {
                _idReporter: "user005",
                reason: "Harassment",
                reportDate: new Date("2023-09-21"),
                status: "pending"
            }
        ],
        groupID: '153531573333',
        content: 'Bài viết đầu tiên của tôi',
        hashTag: [],
        listPhoto: [],
        scope: 'Public',
        interact: {
            _id: '1',
            emoticons: [],
            comment: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        _destroy: null,
        createdBy: "53591573157137"
    },
  ];
  