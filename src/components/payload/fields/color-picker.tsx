"use client";

import React from "react";
import type { UIFieldClientProps } from "payload";
import { useField } from "@payloadcms/ui";
import { Input } from "../../ui/input";
import { toTitleCase } from "@/utils/toTitleCase";

export const ColorPicker: React.FC<UIFieldClientProps> = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path: path || field.name });


  return (
    <div>
      <label className="field-label" htmlFor="field-slug">
        {typeof field.name === "string"
          ? toTitleCase(field.name)
          : typeof field.label === "string"
            ? toTitleCase(field.label)
            : ""}
        {field?.required && <span className="required">*</span>}
      </label>
      <Input
        type="color"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
