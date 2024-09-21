"use client";

import { cn, notify } from "@/lib/utils";
import React, { useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";

import CreateNewUniversity from "./ceate_new_university";

import { FaBuildingFlag } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi";
import Loader from "../Loader";
import { APIResponse } from "@/lib/types";

type University = {
  name: string;
  location: string;
  [x: string]: any;
};

function Universities({ className, userType }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [newUniversity, setNewUniversity] = useState<University>({
    name: "",
    location: "",
  });

  const [closeByUniversities, setCloseByUniversities] = useState<University[]>(
    []
  );

  function handleUpdateFields(fields: any) {
    setNewUniversity((prev) => {
      return { ...prev, ...fields };
    });
  }

  function handleClose(onClose: any) {
    setNewUniversity({
      name: "",
      location: "",
    });
    onClose();
  }

  async function handleCreateNewUniversity() {
    setLoading(true);

    if (newUniversity.name.length <= 3 && newUniversity.location.length <= 3) {
      notify("error", "Provide valid name and description!");
      setLoading(false);
    }

    // const response = await createNewUniversity(newUniversity) || {};

    setCloseByUniversities((prev) => [...prev, newUniversity]);
    notify("success", "University Added!");

    // if (response?.success) {
    //   notify("success", "University Added!");
    //   onOpenChange();
    //   setLoading(false);
    //   return;
    // }

    // notify("error", "Failed to add University!");
    // notify("error", response?.message);

    setLoading(false);
    onOpenChange();
  }

  return (
    <>
      <Card className={cn("gap-6 p-2  w-full min-h-96 shadow-lg mt-8")}>
        <CardBody>
          <Button
            onPress={onOpen}
            size="lg"
            isDisabled={loading}
            variant="flat"
            color="primary"
            className={"px-4"}
          >
            <HiOutlinePlus className="h-5 w-5" />
          </Button>
          <UniversitiesList isLoading={loading} list={closeByUniversities} />
        </CardBody>
      </Card>

      <CreateNewUniversity
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleSave={handleCreateNewUniversity}
        editUniversityField={handleUpdateFields}
        handleClose={handleClose}
        loading={loading}
      />
    </>
  );
}

export function UniversitiesList({ isLoading, list = [] }: any) {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-4">
      {isLoading ? (
        <Loader size={60} loadingText={"Loading..."} />
      ) : (
        <div
          className={cn("grid w-full place-items-center gap-4 rounded-lg", {
            "grid-cols-[repeat(auto-fill,minmax(400px,1fr))]": list?.length > 0,
          })}
        >
          {list &&
            list?.map(({ name, location }: University) => {
              return (
                <Button
                  className={cn(
                    "flex h-auto w-full justify-start gap-4 border-[1px] border-primary/20 bg-transparent p-2 opacity-100 hover:border-primary-200 hover:bg-primary-100"
                  )}
                  startContent={
                    <div
                      className={cn(
                        "z-10 grid aspect-square h-12 w-12 place-items-center rounded-lg bg-gradient-to-tr from-primary to-secondary/80 p-3 text-white transition-all duration-300 ease-in-out"
                      )}
                    >
                      <FaBuildingFlag className="h-6 w-6 self-center" />
                    </div>
                  }
                >
                  <div className="flex flex-col items-start">
                    <h3 className="heading-4 mb-1 capitalize text-secondary font-bold">
                      {name}
                    </h3>
                    {location && (
                      <div className="flex max-w-[260px] justify-between gap-2">
                        <p className=" truncate text-sm font-medium text-slate-400">
                          {location}
                        </p>
                      </div>
                    )}
                  </div>
                </Button>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Universities;
