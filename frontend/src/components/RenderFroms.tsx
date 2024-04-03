import React, { useContext, useState, useRef } from "react";
import { Field } from "formik";
import { Avatar, DatePicker, Select, TreeSelect, Switch } from "antd";
import apis from "../contexts/apis";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MainContext } from "../contexts/mainProvider";

const { SHOW_PARENT } = TreeSelect;

const buildTree = (items: any, parentKey = null) => {
  const map: any = {};
  const roots: any = [];

  // Create a mapping of id to item
  items.forEach((item: any, index: any) => {
    item['title'] = item.name
    item['value'] = item.id
    item['key'] = parentKey ? `${parentKey}-${index}` : `0-${index}`;
    map[item.id] = { ...item, children: [] };
  });


  items.forEach((item: any, key: any) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      roots.push({ ...map[item.id], key: `0-${key}` });
    }
  });

  // console.log(roots)
  return roots;
}

const ButtonBox = (props: any) => {
  return (
    <button
      type="button"
      disabled={props.loading}
      className="site-button w-100"
      {...props}>
      {props.loading ? "Processing..." : props.value}
    </button>
  );
};

const InputBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return (
          <>
            {props.placeholder && (<label>{props.placeholder}</label>)}
            <div className="form-group">
              <div className={props.icon ? "aon-inputicon-box" : ""}>
                <input className={"form-control sf-form-control " + (meta?.error && ("red"))} type="text"
                  value={field.value}
                  onChange={(obj) => {
                    form.setFieldValue(props.name, obj.target.value);
                  }}
                  {...props}
                />
                {props.icon && (<span className="aon-input-icon">{props.icon}</span>)}
              </div>
              {meta?.error && (
                <div className="danger">{form.errors[props.name]}</div>
              )}
            </div>
          </>
        );
      }}
    </Field>

  );
};

const PasswordBox = (props: any) => {
  const [show, setShow] = useState(false);
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return (
          <>
            {props.placeholder && (<label>{props.placeholder}</label>)}
            <div className="form-group">
              <div className={props.icon ? "aon-inputicon-box" : ""}>
                <input className={"form-control sf-form-control " + (meta?.error && ("red"))} type="text"
                  value={field.value}
                  onChange={(obj) => {
                    form.setFieldValue(props.name, obj.target.value);
                  }}
                  {...props}
                />
                {props.icon && (<span className="aon-input-icon">{props.icon}</span>)}
              </div>
              {meta?.error && (
                <div className="danger">{form.errors[props.name]}</div>
              )}
            </div>
          </>
        );

      }}
    </Field>
  );
};

const TextareaBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label>
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="form-group">
            <textarea
              rows={10}
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              placeholder={props.placeholder}
              className={"form-control sf-form-control" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="danger">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

const DateBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <DatePicker
              onChange={(date, obj) => {
                form.setFieldValue(props.name, obj);
              }}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

const SelectBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <select className="relative z-20 w-full px-5 py-3 transition bg-transparent border rounded outline-none appearance-none border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj.target.value);
              }}
              {...props}>
              <option value="">{props.placeholder}</option>
              {props.options.map((item: any, key: any) => item && <option key={key} value={item.value}>{item.label}</option>)}
            </select>
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-4"><IoIosArrowDown /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const MultiSelectBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            {props.tree ? <TreeSelect
              allowClear
              style={{
                width: '100%',
              }}
              placeholder={props.placeholder ?? "Please select"}
              value={field.value}
              showCheckedStrategy={SHOW_PARENT}
              onChange={(obj: any) => {
                form.setFieldValue(props.name, obj);
              }}
              treeData={buildTree(props.options)}
              {...props}
            /> : <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder={props.placeholder ?? "Please select"}
              defaultValue={field.value}
              onChange={(obj: any) => {
                form.setFieldValue(props.name, obj);
              }}
              options={props.options}
              {...props}
            />}

            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-4"><IoIosArrowDown /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const FileBox = (props: any) => {
  const { token } = useContext(MainContext)
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {

        const handleFileChange = async (event: any) => {
          const response: any = await apis.fileUploadApi("files", event.target.files[0], token);
          if (!response?.error) {
            form.setFieldValue(props.name, response?.url);
          }
        };

        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <input
              onChange={handleFileChange}
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
            <span className="absolute right-4 top-2"><Avatar shape="square" src={<img src={field.value ? field.value : "/images/user.png"} alt="" />} /></span>
          </div>
        </>
      }}
    </Field>
  );
};

const TogelBox = (props: any) => {
  return (
    <Field name={props.name}>
      {({ field, form, meta }: any) => {
        return <>
          {props.label && (<label className="mb-2.5 block font-medium text-black dark:text-white">
            {props.label} {(form?.errors[props.name] || props.required) && (<span className="text-meta-1">{"*"}</span>)}
          </label>)}
          <div className="relative">
            <Switch
              value={field.value}
              onChange={(obj) => {
                form.setFieldValue(props.name, obj);
              }}
              placeholder={props.placeholder}
              className={"w-full py-2 pl-6 pr-10 bg-transparent border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" + ((form?.errors[props.name] && form?.touched[props.name]) && " border-b-meta-1")}
              {...props}
            />
            {form?.errors[props.name] && form?.touched[props.name] && (
              <div className="mt-1 text-xs-1 text-meta-1">{form.errors[props.name]}</div>
            )}
          </div>
        </>
      }}
    </Field>
  );
};

export {
  ButtonBox,
  InputBox,
  PasswordBox,
  TextareaBox,
  SelectBox,
  MultiSelectBox,
  DateBox,
  TogelBox,
  FileBox
};
