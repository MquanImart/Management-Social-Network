import { useState } from "react";
import { Group } from "../../../../interface/interface";

const useGroups = () => {
    const [listGroups, setListGroups]  = useState<Group[]>(sampleGroups);

    const activeLock = (groupID: string) => {
        setListGroups(
            listGroups.map((group) =>
                group._id === groupID
                ? { ...group, _destroy: new Date() } 
                : group
            )
        );
    }

    const openActivity = (groupID: string) => {
        setListGroups(
            listGroups.map((group) =>
                group._id === groupID
                ? { ...group, _destroy: null } 
                : group
            )
        );
    }
    return {
        listGroups, setListGroups,
        activeLock, openActivity
    }
}

export default useGroups;

const sampleGroups: Group[] = [
    {
      _id: "group1",
      warningLevel: 0,
      groupName: "Tech Enthusiasts",
      type: "public",
      idAdmin: "admin1",
      introduction: "A group for people who love technology.",
      avt: "https://example.com/avt1.jpg",
      backGround: "https://example.com/background1.jpg",
      members: {
        count: 150,
        listUsers: [
          { idUser: "user1", joinDate: "2024-01-01" },
          { idUser: "user2", joinDate: "2024-01-02" }
        ]
      },
      article: {
        count: 50,
        listArticle: [
          { idArticle: "group1", state: "published" },
          { idArticle: "group2", state: "draft" }
        ]
      },
      rule: ["Be respectful", "No spam"],
      Administrators: [
        { idUser: "admin1", joinDate: "2023-12-25" },
        { idUser: "mod1", joinDate: "2024-02-01" }
      ],
      hobbies: ["Programming", "Gaming"],
      createdAt: new Date("2023-12-20"),
      updatedAt: new Date("2024-03-15"),
      _destroy: null
    },
    {
      _id: "group2",
      warningLevel: 1,
      groupName: "Fitness Freaks",
      type: "private",
      idAdmin: "admin2",
      introduction: "A community of fitness enthusiasts.",
      avt: "https://example.com/avt2.jpg",
      backGround: "https://example.com/background2.jpg",
      members: {
        count: 80,
        listUsers: [
          { idUser: "user3", joinDate: "2024-03-10" },
          { idUser: "user4", joinDate: "2024-03-11" }
        ]
      },
      article: {
        count: 20,
        listArticle: [
          { idArticle: "group3", state: "published" },
          { idArticle: "group4", state: "review" }
        ]
      },
      rule: ["Keep discussions relevant", "Be kind"],
      Administrators: [
        { idUser: "admin2", joinDate: "2024-01-15" }
      ],
      hobbies: ["Running", "Weightlifting"],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-04-20"),
      _destroy: new Date("2024-05-10")
    },
    {
      _id: "group3",
      warningLevel: 2,
      groupName: "Food Lovers",
      type: "public",
      idAdmin: "admin3",
      introduction: "Sharing the love of food from around the world.",
      avt: "https://example.com/avt3.jpg",
      backGround: "https://example.com/background3.jpg",
      members: {
        count: 200,
        listUsers: [
          { idUser: "user5", joinDate: "2024-02-14" },
          { idUser: "user6", joinDate: "2024-02-15" }
        ]
      },
      article: {
        count: 100,
        listArticle: [
          { idArticle: "group5", state: "published" },
          { idArticle: "group6", state: "archived" }
        ]
      },
      rule: ["Post only food-related content", "No hate speech"],
      Administrators: [
        { idUser: "admin3", joinDate: "2024-01-25" },
        { idUser: "mod2", joinDate: "2024-03-05" }
      ],
      hobbies: ["Cooking", "Traveling"],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-06-01"),
      _destroy: new Date("2024-06-15")
    }
  ];
  