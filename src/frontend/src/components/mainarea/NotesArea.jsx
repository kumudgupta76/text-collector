import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";
import { useMediaQuery, Paper, Typography } from "@material-ui/core";
import { useUiStore, useTodosStore, useUserStore } from "../../storeLocal";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
  WbIncandescentOutlined as IdeaIcon,
  LabelOutlined as LabelIcon,
  HourglassEmptyOutlined,
  Archive,
  ArchiveOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.mixins.drawer.minWidth - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  todoCreateContainer: {
    display: "flex",
    padding: theme.spacing(4, 0),
    margin: theme.spacing(0, 1),
  },
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: "0 auto",
  },
  todosWrapper: {
    margin: "0 auto",
    columnWidth: theme.spacing(29),
    columnGap: "0.5rem",
  },
  todoWrapper: {
    // width: theme.spacing(29),
    margin: "0 auto",
    breakInside: "avoid",
    pageBreakInside: "avoid",
    padding: "0.5rem 0",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

export default function () {
  // debugger
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLaptopL = useMediaQuery(theme.breakpoints.up("lg"));
  const is4K = useMediaQuery(theme.breakpoints.up("xl"));
  const numberOfColumns = is4K
    ? 4
    : isLaptopL
    ? 2
    : isLaptop
    ? 2
    : isTablet
    ? 2
    : 1;
  var width = is4K
    ? "100%"
    : isLaptopL
    ? "1000px"
    : isLaptop
    ? "730px"
    : isTablet
    ? "480px"
    : "100%";
  const [{ isListView }] = useUserStore();
  const [{ isNavBarOpen, noteInEditMode, selectedLabelId }] = useUiStore();
  const [notesItems] = useTodosStore();
  const state = useSelector((state) => _.pick(state, ["note"]));
  const filteredItems = _.get(state, "note.notes", []).filter((item) => {
    console.log(item);
    if (selectedLabelId !== "") {
      return item.labels.some((labelItem) => labelItem.id === selectedLabelId);
    } else {
      return true;
    }
  });
  width = isListView
    ? isLaptop || isLaptopL
      ? theme.spacing(75)
      : "100%"
    : width;
  console.log(filteredItems, notesItems);
  return (
    <main>
      <div
        className={
          isMobile || !isNavBarOpen ? classes.contentShift : classes.content
        }
      >
        <div className={classes.todoCreateContainer}>
          <div className={classes.todoCreateWrapper}>
            <TodoCreate />
          </div>
        </div>
        <div
          className={classes.todosWrapper}
          style={{
            columnCount: isListView ? 1 : numberOfColumns,
            width: width,
          }}
        >
          {filteredItems.map((noteItem) => {
            return (
              <div
                key={noteItem.id}
                className={classes.todoWrapper}
                style={{ width: isMobile || isListView ? "100%" : null }}
              >
                <TodoItem
                  noteItem={noteItem}
                  isEditMode={noteInEditMode === noteItem.id}
                />
              </div>
            );
          })}
          {_.isEmpty(filteredItems) && (
            <div
              className={classes.todoWrapper}
              style={{ width: "100%", columnCount: 1, display: "inline-block" }}
            >
              <Paper style={{ textAlign: "center" }}>
                <ArchiveOutlined fontSize="large"></ArchiveOutlined>
                <Typography
                  className={classes.textWelcome}
                  color="textSecondary"
                  variant="subtitle1"
                >
                  No Data
                </Typography>
              </Paper>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
