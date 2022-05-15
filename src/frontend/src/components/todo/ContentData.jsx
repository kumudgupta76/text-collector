import React from "react";
import ContentList from "./ContentList";
import ContentText from "./ContentText";

export default function ({ data, setData, isEditMode }) {
  return (
    <ContentText notes={[{'text':data}]} setNotes={setData} isEditMode={isEditMode} />
  );
}
