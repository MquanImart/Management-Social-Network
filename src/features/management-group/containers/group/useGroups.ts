import { useState, useEffect } from "react";
import axios from "axios";
import { Group } from "../../../../interface/interface";

const useGroups = () => {
  const [listGroups, setListGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchGroups = async () => {
          try {
              setLoading(true);
              const response = await axios.get("http://localhost:3000/v1/group/all-groups", {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token if needed
                  },
              });
              setListGroups(response.data.groups);
          } catch (error) {
              console.error("Error fetching groups:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchGroups();
  }, []);

  const activeLock = async (groupID: string) => {
      try {
          const response = await axios.post(
              `http://localhost:3000/v1/group/${groupID}/lock`,
              {},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token if needed
                  },
              }
          );
          console.log(response.data.message);

          // Update the group list to reflect the lock
          setListGroups(
              listGroups.map((group) =>
                  group._id === groupID ? { ...group, _destroy: new Date() } : group
              )
          );
      } catch (error) {
          console.error(`Error locking group ${groupID}:`, error);
      }
  };

  const openActivity = async (groupID: string) => {
      try {
          const response = await axios.post(
              `http://localhost:3000/v1/group/${groupID}/unlock`,
              {},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Token if needed
                  },
              }
          );
          console.log(response.data.message);

          // Update the group list to reflect the unlock
          setListGroups(
              listGroups.map((group) =>
                  group._id === groupID ? { ...group, _destroy: null } : group
              )
          );
      } catch (error) {
          console.error(`Error unlocking group ${groupID}:`, error);
      }
  };

  return {
      listGroups,
      loading,
      setListGroups,
      activeLock,
      openActivity,
  };
};


export default useGroups;
