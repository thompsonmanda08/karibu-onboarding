"use client";

import { cn, notify } from "@/lib/utils";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import CreateNewUniversity from "./ceate_new_university";

import { FaBuildingFlag, FaXmark } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi";
import Loader from "../Loader";
import { APIResponse } from "@/lib/types";

type University = {
  name: string;
  location: string;
  [x: string]: any;
};

function Universities({ updateUserDetails, userType }: any) {
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

    if (!newUniversity?.name || !newUniversity.location) {
      notify("error", "Provide valid name and description!");
      setLoading(false);
    }

    // const response = await createNewUniversity(newUniversity) || {};

    setCloseByUniversities((prev) => [...prev, newUniversity]);
    notify("success", "University Added!");
    updateUserDetails({ universities: closeByUniversities });

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

  function removeIndex(index: number) {
    setCloseByUniversities((prev) => {
      return prev.filter((_, i) => i !== index);
    });
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
            <HiOutlinePlus className="aspect-square w-4" />
            Add
          </Button>
          <UniversitiesList
            isLoading={loading}
            list={closeByUniversities}
            removeIndex={removeIndex}
          />
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

export function UniversitiesList({ isLoading, list = [], removeIndex }: any) {
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
            list?.map(({ name, location }: University, index: number) => {
              return (
                <div className="flex w-full relative">
                  <Button
                    className={cn(
                      "flex h-auto w-full justify-start gap-4 border-[1px] border-primary/20 bg-transparent p-2 opacity-100 hover:border-primary/50 hover:bg-primary/5"
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
                  <Tooltip
                    content="Remove University"
                    color="danger"
                    placement="top"
                  >
                    <Button
                      onPress={() => removeIndex(index)}
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="absolute top-[25%] right-4 cursor-pointer"
                    >
                      <FaXmark className="w-8 h-8 font-normal p-2 rounded-full ml-auto hover:bg-red-500/10 text-red-300  transition-all ease-in-out duration-300 hover:text-red-500 " />
                    </Button>
                  </Tooltip>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Universities;
