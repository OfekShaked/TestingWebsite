import React, { useContext, useState } from "react";
import FormField from "../../../common/form_field/FormField";
import { TopicContext } from "../../../../contexts/TopicContext";
import { TextField, Checkbox, Paper, Stack } from "@mui/material";
import RedirectOnEmptyTopic from "../../../common/redirect_conditions/RedirectOnEmptyTopic";
import SelectChoices from "../../../common/select_choices/SelectChoices";
import TextEditor from "../../../common/text_editor/TextEditor";
import { EditorState, convertFromRaw } from "draft-js";
import "./ModifyTest.css";

const ModifyTest = () => {
  const topicContext = useContext(TopicContext);
  const [test, setTest] = useState({
    topic_id: topicContext.topic._id,
    language: "English",
    name: "",
    passing_grade: "50",
    is_answer_shown: "true",
    instructions: "",
    instructions_editor: EditorState.createEmpty(),
    success_text: "",
    success_text_editor: EditorState.createEmpty(),
    failed_text: "",
    failed_text_editor: EditorState.createEmpty(),
    tester_email: "",
    email_success_content: "",
    email_failed_conent: "",
    questions: [],
  });

  /**
   * update test inner property generic
   * @param {*} keys
   * @param {*} value
   */
  const updateTestProperty = (keys, value) => {
    let testToUpdate = { ...test };
    let obj = testToUpdate;
    for (var i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[i]] = value;
    setTest(testToUpdate);
  };

  const updateTextEditor = (keys, value) => {
    updateTestProperty(
      keys,
      value === null
        ? EditorState.createEmpty()
        : EditorState.createWithContent(convertFromRaw(JSON.parse(value))),
      null
    );
  };

  return (
    <>
      <RedirectOnEmptyTopic />
      <Paper className="centerize">
        <Stack spacing={2}>
          <FormField field={"Field of study"}>
            {topicContext.topic.name}
          </FormField>
          <FormField field={"Language"}>
            <SelectChoices
              value={test.language}
              onValueChange={(e) =>
                updateTestProperty(["language"], e.target.value)
              }
              choices={[
                { value: "English", text: "English" },
                { value: "Hebrew", text: "Hebrew" },
              ]}
            />
          </FormField>
          <FormField field={"Test Name"}>
            <TextField
              id="tag-input"
              label="Test Name"
              value={test.name}
              onChange={(e) => updateTestProperty(["name"], e.target.value)}
            />
          </FormField>
          <FormField field={"Show Correct Answers After Submission"}>
            <Checkbox
              checked={test.is_answer_shown}
              onChange={(e) =>
                updateTestProperty(["is_answer_shown"], e.target.checked)
              }
            />
          </FormField>
          <FormField field={"Test Instructions"}>
            <TextEditor
              value={test.instructions_editor}
              setValue={(value) => updateTestProperty(["instructions"], value)}
              setEditorValue={(value) =>
                updateTestProperty(["instructions_editor"], value)
              }
              editorValue={test.instructions_editor}
            />
          </FormField>
          <FormField field={"Message to show on success"}>
            <TextEditor
              value={test.success_text}
              setValue={(value) => updateTestProperty(["success_text"], value)}
              setEditorValue={(value) =>
                updateTextEditor(["success_text_editor"], value)
              }
              editorValue={test.success_text_editor}
            />
          </FormField>
          <FormField field={"Message to show on failure"}>
            <TextEditor
              value={test.failed_text}
              setValue={(value) => updateTestProperty(["failed_text"], value)}
              setEditorValue={(value) =>
                updateTextEditor(["failed_text_editor"], value)
              }
              editorValue={test.failed_text_editor}
            />
          </FormField>
          
        </Stack>
      </Paper>
    </>
  );
};
export default ModifyTest;
