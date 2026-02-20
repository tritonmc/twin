import { setMetadata } from "actions/editor";
import { setItems } from "actions/items";
import { useEditorSettings } from "hooks/useEditorSettings";
import { useGlobalSettings } from "hooks/useGlobalSettings";
import { fromJS, List, Map } from "immutable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";

const EditorLoader = ({ setErrorLoading }) => {
  const { id } = useParams();
  const { setLoading } = useGlobalSettings();
  const { setTritonv, setBungee, setLanguages, setPreviewLanguage } = useEditorSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/v1/get/" + id);
        if (!response.ok) {
          throw new Error("non-200 code response");
        }
        const data = await response.json();

        setTritonv(data.tritonv);
        setBungee(data.bungee);
        setLanguages(data.languages);

        const items = fromJS(data.data).map((item) => {
          if (item.get("type", "text") === "sign") {
            item = item.update("locations", List(), (locations) =>
              locations.map((location) => location.mergeWith((oldVal) => oldVal, { id: uuid() }))
            );
          }
          return item
            .update("_twin", Map(), (metadata) =>
              metadata.mergeWith((oldVal) => oldVal, {
                id: uuid(),
                dateCreated: Date.now(),
                dateUpdated: Date.now(),
                tags: item.get("tags", List()),
              })
            )
            .remove("tags");
        });

        if (data.tritonv >= 2) setPreviewLanguage(data.mainLanguage);
        if (data.tritonv >= 4) {
          if (data.bungee) {
            dispatch(setMetadata(data.metadata));
          } else {
            dispatch(
              setMetadata(
                items.reduce((map, item) => map.set(item.get("fileName", "default"), Map()), Map())
              )
            );
          }
        }
        dispatch(setItems(items));

        setLoading(false);
      } catch (e) {
        console.error(e);
        setErrorLoading(true);
      }
    })();
  }, [
    id,
    setLoading,
    dispatch,
    setTritonv,
    setBungee,
    setLanguages,
    setPreviewLanguage,
    setErrorLoading,
  ]);

  return <></>;
};

export default EditorLoader;
