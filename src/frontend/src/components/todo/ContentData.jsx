import React from "react";
import ContentList from "./ContentList";
import { makeStyles } from "@material-ui/core/styles";

import ContentText from "./ContentText";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const useStyles = makeStyles((theme) => ({
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1),
  },
  optionWrapper: {
    padding: theme.spacing(0, 1),
  },
  barClose: {},
  inputNoteRoot: {
    ...theme.custom.fontFamily.roboto,
    padding: theme.spacing(0.5, 2, 1.5, 2),
  },
  inputNoteInput: {
    fontWeight: 400,
    fontSize: "0.88rem",
    padding: 0,
    color: theme.palette.text.primary,
  },
  textContainer: {
    padding: theme.spacing(0.5, 2, 1.5, 2),
  },
  textNote: {
    ...theme.custom.fontFamily.roboto,
    fontWeight: 400,
    fontSize: "0.88rem",
    color: theme.palette.text.primary,
  },
}));

export default function ({ data, setData, isEditMode }) {
  const classes = useStyles();
  return !isEditMode ? (
    <div className={classes.textContainer}>
      <ReactMarkdown
        children={data}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                // style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  ) : (
    <ContentText
      notes={[{ text: data }]}
      setNotes={setData}
      isEditMode={isEditMode}
    />
  );
}
