import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import {
  PaletteOutlined as PaletteIcon,
  LabelOutlined as LabelIcon,
  DeleteOutlineOutlined as DeleteIcon,
  FileCopyOutlined as CopyIcon,
  CheckBoxOutlined as CheckBoxIcon,
  IndeterminateCheckBoxOutlined as HideCheckBoxIcon,
  PrintOutlined as PreviewIcon,
  CheckOutlined as CheckIcon,
  CloseOutlined as CloseIcon,
  RedoOutlined as RedoIcon,
  UndoOutlined as UndoIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import ColorPopover from "./ColorPopover";
import LabelPopover from "./LabelPopover";
// import { copyTodo, deleteTodo } from "../../gql";
// import { useMutation } from "urql";
import { useTodosStore } from "../../storeLocal";

const useStyles = makeStyles((theme) => ({
  optionWrapperOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  disabledButton: {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    pointerEvents: "auto"
  },
}));

export default function ({
  id,
  labels,
  setLabels,
  color,
  setColor,
  setCheckboxMode,
  isCreateMode,
  isCheckboxMode,
  isEditMode,
  canRedo,
  canUndo,
  redoNote,
  undoNote,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const refActionColor = useRef();
  const refActionLabel = useRef();
  const [isColorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [isLabelPopoverOpen, setLabelPopoverOpen] = useState(false);

  const copyNote = () => {
    // copyNoteExecute({ id }).then(({ data }) => {
    //   dispatchTodo({ type: "CREATED", payload: data.copyTodo });
    // });
    console.log("copy called");
  };

  const deleteNote = () => {
    // deleteNoteExecute({ id }).then(({ data }) => {
    //   dispatchTodo({ type: "DELETED", payload: data.deleteTodo });
    // });
    console.log("delete called");
  };

  return (
    <>
      <div className={classes.optionWrapperOuter}>
        <div className={classes.optionsWrapper}>
          <div className={classes.optionWrapperFirst}>
            <Tooltip title="Change color">
              <IconButton
                size="small"
                aria-label="change color"
                ref={refActionColor}
                onClick={() => setColorPopoverOpen(true)}
              >
                <PaletteIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.optionWrapper}>
            <Tooltip title="Show checkboxes">
              <IconButton
                size="small"
                aria-label="show checkboxes"
                onClick={() => setCheckboxMode(!isCheckboxMode)}
              >
                {isCheckboxMode ? (
                  <HideCheckBoxIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                ) : (
                  <CheckBoxIcon
                    htmlColor={theme.custom.palette.iconHighlight}
                    fontSize="small"
                  />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.optionWrapper}>
            <Tooltip title="Change labels">
              <IconButton
                size="small"
                aria-label="change labels"
                ref={refActionLabel}
                onClick={() => setLabelPopoverOpen(true)}
              >
                <LabelIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
          {isCreateMode ? null : (
            <>
              <div className={classes.optionWrapper}>
                <Tooltip title="Make a copy">
                  <IconButton
                    size="small"
                    aria-label="make a copy"
                    onClick={copyNote}
                  >
                    <CopyIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.optionWrapper}>
                <Tooltip title="Delete note">
                  <IconButton
                    size="small"
                    aria-label="delete note"
                    onClick={deleteNote}
                  >
                    <DeleteIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
        </div>
        <ColorPopover
          anchorEl={refActionColor.current}
          isOpen={isColorPopoverOpen}
          onClose={() => setColorPopoverOpen(false)}
          currentColor={color}
          onColorSelect={(color) => setColor(color)}
        />
        <LabelPopover
          anchorEl={refActionLabel.current}
          isOpen={isLabelPopoverOpen}
          setLabels={setLabels}
          labels={labels}
          onClose={() => setLabelPopoverOpen(false)}
        />
        <div className={classes.optionsWrapper}>
          {!isEditMode ? null : (
            <>
              <div style={{ borderRight: "1px solid" }}></div>
              <div className={classes.optionWrapper}>
                <Tooltip title="Preview">
                  <IconButton
                    size="small"
                    aria-label="Preview"
                    onClick={copyNote}
                  >
                    <PreviewIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.optionWrapper}>
                <Tooltip title="Redo">
                  <IconButton
                    size="small"
                    aria-label="redo"
                    onClick={redoNote}
                    disabled={!canRedo}
                    classes={{ disabled: classes.disabledButton}}
                  >
                    <RedoIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.optionWrapper}>
                <Tooltip title="Undo">
                  <IconButton
                    size="small"
                    aria-label="undo"
                    onClick={redoNote}
                    disabled={!canUndo}
                    classes={{ disabled: classes.disabledButton }}
                  >
                    <UndoIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.optionWrapper}>
                <Tooltip title="Discard">
                  <IconButton
                    size="small"
                    aria-label="Discard"
                    onClick={copyNote}
                  >
                    <CloseIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>

              <div className={classes.optionWrapperLast}>
                <Tooltip title="Save">
                  <IconButton
                    size="small"
                    aria-label="Save"
                    onClick={deleteNote}
                  >
                    <CheckIcon
                      htmlColor={theme.custom.palette.iconHighlight}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
