import {
  ArrowUpOutlined,
  DeleteTwoTone,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import React from "react";
import styled from "styled-components";
import { ModalTask } from "./ModalTask";
const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 10px;
`;

const TableWrapper = styled.div`
  padding: 1rem;
  background: #fff;
  border-radius: 10;
  display: flex;
  flex-direction: column;
`;
const StyledTable = styled(Table)`
  margin-top: 1rem;
`;
export type TaskInfo = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN PROGRESS" | "DONE";
  priority: "1" | "2" | "3";
};
export const ExampleComponent: React.FC = () => {
  const [dataMock, setDataMock] = React.useState<TaskInfo[]>([
    {
      id: "1",
      title: "Title 1",
      description: "This is description 1",
      status: "TODO",
      priority: "1",
    },
    {
      id: "2",
      title: "Title 2",
      description: "This is description 2",
      status: "IN PROGRESS",
      priority: "2",
    },
    {
      id: "3",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "4",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "5",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "6",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "7",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "8",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "9",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "10",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
    {
      id: "11",
      title: "Title 3",
      description: "This is description 3",
      status: "DONE",
      priority: "3",
    },
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    TaskInfo | undefined
  >();

  const [editedTitle, setEditedTitle] = React.useState();
  const [tempTitle, setTempTitle] = React.useState("");

  const columns: ColumnProps<Partial<TaskInfo>>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => {
        return a.title.localeCompare(b.title);
      },
      sortDirections: ["descend", "ascend"],
      render: (_: any, record: any) => {
        return (
          <>
            {record.id === editedTitle ? (
              <input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                autoFocus
                onBlur={() => {
                  const index = dataMock.findIndex((i) => i.id === record.id);
                  setDataMock([
                    ...dataMock.slice(0, index),
                    { ...record, title: tempTitle },
                    ...dataMock.slice(index + 1, dataMock.length),
                  ]);
                  setEditedTitle(undefined);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const index = dataMock.findIndex((i) => i.id === record.id);
                    setDataMock([
                      ...dataMock.slice(0, index),
                      { ...record, title: tempTitle },
                      ...dataMock.slice(index + 1, dataMock.length),
                    ]);
                    setEditedTitle(undefined);
                  }
                }}
              />
            ) : (
              <div
                onClick={() => {
                  setEditedTitle(record.id);
                  setTempTitle(record.title);
                }}
              >
                {record.title}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      sorter: (a: any, b: any) => {
        return parseInt(a.priority) - parseInt(b.priority);
      },
      sortDirections: ["descend", "ascend"],
      filters: [
        {
          text: "Low",
          value: "1",
        },
        {
          text: "Medium",
          value: "2",
        },
        {
          text: "High",
          value: "3",
        },
      ],
      onFilter: (value, record) => {
        return value === record.priority;
      },
      render: (_: any, record: any) => {
        let color = "";
        let text = "";
        const priority = record.priority || "";
        switch (priority) {
          case "1":
            color = "#2db7f5";
            text = "low";
            break;
          case "2":
            color = "#87d068";
            text = "medium";
            break;
          case "3":
            color = "#f50";
            text = "high";
            break;
          default:
            break;
        }

        return (
          <>
            <Tag
              color={color}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (record.priority === "3") {
                  return;
                } else {
                  const index = dataMock.findIndex((i) => i.id === record.id);
                  setDataMock([
                    ...dataMock.slice(0, index),
                    {
                      ...record,
                      priority: record.priority === "1" ? "2" : "3",
                    },
                    ...dataMock.slice(index + 1, dataMock.length),
                  ]);
                }
              }}
            >
              <ArrowUpOutlined style={{ marginRight: 4 }} />
              {text.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "To Do",
          value: "TODO",
        },
        {
          text: "In Progress",
          value: "IN PROGRESS",
        },
        {
          text: "Done",
          value: "DONE",
        },
      ],
      onFilter: (value, record) => {
        return value === record.status;
      },
      render: (_: any, record: any) => {
        const color =
          record.status === "TODO"
            ? "magenta"
            : record.status === "IN PROGRESS"
            ? "geekblue"
            : "green";
        return (
          <>
            <Tag
              style={{ cursor: "pointer" }}
              color={color}
              onClick={() => {
                if (record.status === "DONE") {
                  return;
                } else {
                  const index = dataMock.findIndex((i) => i.id === record.id);
                  setDataMock([
                    ...dataMock.slice(0, index),
                    {
                      ...record,
                      status: record.status === "TODO" ? "IN PROGRESS" : "DONE",
                    },
                    ...dataMock.slice(index + 1, dataMock.length),
                  ]);
                }
              }}
            >
              {record.status.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (index: any, record: any) => (
        <>
          <Button
            type="link"
            style={{ padding: "4px 8px" }}
            onClick={() => {
              setSelectedItem(record);
              setShowModal(true);
            }}
          >
            <Tooltip title="Edit">
              <EditOutlined />
            </Tooltip>
          </Button>

          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() =>
              setDataMock((prev) =>
                prev.filter((item) => item.id !== record.id)
              )
            }
          >
            <Button type="link" style={{ padding: "4px 8px" }}>
              <Tooltip title="Delete">
                <DeleteTwoTone twoToneColor="#f5222d" />
              </Tooltip>
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <TableWrapper>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <div>
            <Tag color="volcano">Total: {dataMock.length}</Tag>
            <Tag color="orange">
              Done: {dataMock.filter((i) => i.status === "DONE").length}
            </Tag>
          </div>
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            id="button-add"
          >
            Create New Task
          </Button>
        </div>
        <StyledTable dataSource={dataMock} columns={columns} />
      </TableWrapper>
      {showModal && (
        <ModalTask
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          showModal={showModal}
          setShowModal={setShowModal}
          setDataMock={setDataMock}
          dataMock={dataMock}
        />
      )}
    </Wrapper>
  );
};
