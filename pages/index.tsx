import Head from "next/head";
import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaLock, FaStar, FaRocket, FaPlus, FaFilter } from "react-icons/fa";
import {
  FaRegCircleXmark,
  FaAlignJustify,
  FaAnglesLeft,
  FaRectangleList,
  FaArrowDownWideShort,
  FaSistrix,
} from "react-icons/fa6";
import axios from "axios";
import styles from "@/styles/Index.module.css";
import Link from "next/link";
import ChartComponent from "./components/chart";

export default function Home() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [getProject, setGetProject] = useState<any>(null);
  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [projectInfo, setProjectInfo]: any = useState(undefined);
  const [getDataName, setGetDataName]: any = useState(undefined);
  const [getDataValue, setGetDataValue]: any = useState(undefined);
  const [getMissingValue, setGetMissingValue]: any = useState(undefined);

  useEffect(() => {
    getAllData();
  }, []);

  const containerStyle = {
    gridTemplateColumns: projectDetail ? "1fr 1fr 5fr" : "1fr 5fr",
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        "http://3.36.0.92:8888/analysis/projectSearch"
      );
      setGetProject(response.data);
      console.log(getProject);
    } catch (error) {
      console.error("에러사항: ", error);
    }
  };
  // 프로젝트생성@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const onNewProject = () => {
    setCreateModal(true);
  };

  const onChangeProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProjectName(value);
  };

  const onChangeProjectDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProjectDescription(value);
  };

  const onFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const config = {
        projectName: projectName,
        description: projectDescription,
      };
      const configString = JSON.stringify(config);
      formData.append("projectConfig", configString);
      formData.append("dataFile", selectedFile);

      const response = await fetch(
        "http://3.36.0.92:8888/analysis/newProject",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("데이터가 성공적으로 전송되었습니다.");
        setCreateModal(false);
        location.reload();
      } else {
        console.error("데이터 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };
  // 프로젝트생성@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // my project 클릭했을떄
  const pickProject = async (num: number) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://3.36.0.92:8888/analysis/dataList",
        params: {
          projectConfigId: num,
        },
      });

      // 상태 업데이트
      setProjectInfo([response.data[0]]);
      console.log(projectInfo);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  // my project 클릭했을떄

  // tab에있는데이터클릭
  const getProjectData = async () => {
    try {
      const pramDataId = projectInfo[0]["dataId"];
      const response = await axios({
        method: "get",
        url: "http://3.36.0.92:8888/analysis/dataPreview",
        params: {
          dataId: pramDataId,
        },
      });
      setGetMissingValue(response.data.MissingValue);
      setGetDataName(response.data.Columns);
      setGetDataValue(response.data.Table.slice(0, 10));
    } catch (error) {
      console.log("error : ", error);
    }
  };
  // tab에있는데이터클릭
  /////////////////////////////////////////////////////////////
  //////평균구하기

  // const [getDataTag, setGetDataTag]: any = useState([]);
  // const [getDataNum, setGetDataNum]: any = useState([]);

  // let dataAverage: number[] = [];

  // if (getDataValue && getDataName !== undefined) {
  //   getDataName.map((name: string, idx: number) => {
  //     setGetDataTag(name);
  //     getDataValue.map((value: any, idx: number) => {});
  //   });
  // }
  /////평균구하기
  useEffect(() => {
    const onZoom = (num: number) => {
      const dataChartElements = document.querySelectorAll(".data_chart");

      // Example: Apply a zoom class to the element based on the given num
      dataChartElements.forEach((element, index) => {
        if (index === num) {
          element.classList.add("zoom");
        } else {
          element.classList.remove("zoom");
        }
      });
    };
  }, []);

  return (
    <>
      {createModal ? (
        <div className={styles.create_modal}>
          <form className={styles.create_form} onSubmit={onSubmit}>
            <button
              className={styles.close_btn}
              onClick={() => {
                setCreateModal(false);
              }}
            >
              <FaRegCircleXmark />
            </button>
            <fieldset>
              <label>Create Project</label>
              <div>
                Project Name
                <input
                  name="project_name"
                  type="text"
                  placeholder="Type Project Name"
                  value={projectName}
                  onChange={onChangeProjectName}
                  required
                />
              </div>

              <div>
                Project Description
                <input
                  name="project_description"
                  type="text"
                  placeholder="Text generation with transformers"
                  value={projectDescription}
                  onChange={onChangeProjectDescription}
                />
              </div>
              <div>
                Project Data
                <input
                  name="project_data"
                  type="file"
                  placeholder="Upload your Data File"
                  accept=".csv, .xlsx, .xls"
                  required
                  onChange={onFileChange} // 파일 선택 시 실행될 함수
                />
              </div>
              <input
                type="submit"
                value="Create Project"
                className={styles.submit_btn}
              />
            </fieldset>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.wrap} style={{ ...containerStyle }}>
        <div className={styles.tab}>
          <Link legacyBehavior href="/">
            <a className={styles.to_home}>HOME</a>
          </Link>
          <dl>
            <dt>My Projects</dt>
            <dd>
              <FaLock style={{ marginRight: "10px" }} />
              User/Project-name
            </dd>
            <dd className={styles.project_name}>
              <ul>
                {getProject != undefined ? (
                  getProject.map((project: any, idx: number) => (
                    <li
                      key={idx}
                      onClick={() => {
                        pickProject(project.projectConfigid);
                        setProjectDetail(true);
                      }}
                    >
                      {" "}
                      {project.projectName}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </dd>
            <dd>
              <div>
                <FaPlus style={{ marginRight: "10px" }} />
                <span onClick={onNewProject}>Create New Project</span>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>Applications</dt>
            <dd>
              <FaStar style={{ marginRight: "10px" }} />
              Model registry
            </dd>
            <dd>
              <FaRocket style={{ marginRight: "10px" }} />
              Launch
            </dd>
          </dl>
          <dl>
            <dt>Profile</dt>
            <dd>User</dd>
          </dl>
          <dl>
            <dt>Team</dt>
            <dd>
              <FaPlus style={{ marginRight: "10px" }} />
              Create team
            </dd>
          </dl>
        </div>
        {projectDetail ? (
          <div className={styles.sub_tab}>
            {projectDetail ? (
              <>
                <div className={styles.tab_wrap}>
                  <div className={styles.tab_con}>
                    <div className={styles.tab_header}>
                      <div className={styles.tab_header_top}>
                        <span>Runs</span>
                        <div>
                          <FaAnglesLeft
                            onClick={() => {
                              setProjectDetail(false);
                              setProjectInfo(undefined);
                              setGetDataName(undefined);
                              setGetDataValue(undefined);
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.tab_header_mid}>
                        <input type="text" placeholder="Search Runs"></input>
                      </div>
                      <div className={styles.tab_header_bottom}>
                        <FaFilter />
                        <FaRectangleList />
                        <FaArrowDownWideShort />
                      </div>
                    </div>
                  </div>
                  <div className={styles.project_wrap}>
                    <div className={styles.project_file}>
                      {projectInfo != undefined ? (
                        projectInfo.map((info: any, idx: number) => (
                          <div className={styles.project_name} key={idx}>
                            {info.projectName}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}

                      {projectInfo != undefined ? (
                        projectInfo.map((info: any, idx: number) => (
                          <div key={idx}>
                            <div
                              className={styles.project_info}
                              onClick={() => {
                                getProjectData();
                              }}
                            >
                              - {info.fileName}
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {getDataName && getDataValue != undefined ? (
          <div className={styles.contents}>
            <div className={styles.data_visual}>
              <div className={styles.data_chart}>
                <div className={styles.data_type}>TABLE</div>

                <>
                  <div className={styles.data_table}>
                    <table>
                      <thead>
                        <tr>
                          {getDataName != undefined ? (
                            getDataName.map((name: string, idx: number) => (
                              <th key={idx}>{name}</th>
                            ))
                          ) : (
                            <></>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {getDataValue &&
                          getDataValue.map((row: any, index: number) => (
                            <tr key={index}>
                              {getDataName &&
                                getDataName.map(
                                  (column: string, index: number) => (
                                    <td key={index}>
                                      {row[column] !== null
                                        ? row[column]
                                        : "N/A"}
                                    </td>
                                  )
                                )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              </div>

              <div className={styles.chart_frame}>
                <div className={styles.data_chart}>
                  <div className={styles.data_type}>
                    <div>CHART(Missing Value)</div>
                    <div>
                      <FaSistrix />
                    </div>
                  </div>
                  {getDataName && getDataValue != undefined ? (
                    <ChartComponent
                      dataName={getDataName}
                      getMissingValue={getMissingValue}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className={styles.data_chart}>
                  <div className={styles.data_type}>
                    <div>CHART(Missing Value)</div>
                    <div>
                      <FaSistrix />
                    </div>
                  </div>
                  {getDataName && getDataValue != undefined ? (
                    <ChartComponent
                      dataName={getDataName}
                      getMissingValue={getMissingValue}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className={styles.data_chart}>
                  <div className={styles.data_type}>
                    <div>CHART(Missing Value)</div>
                    <div>
                      <FaSistrix />
                    </div>
                  </div>
                  {getDataName && getDataValue != undefined ? (
                    <ChartComponent
                      dataName={getDataName}
                      getMissingValue={getMissingValue}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className={styles.data_chart}>
                  <div className={styles.data_type}>
                    <div>CHART(Missing Value)</div>
                    <div>
                      <FaSistrix />
                    </div>
                  </div>
                  {getDataName && getDataValue != undefined ? (
                    <ChartComponent
                      dataName={getDataName}
                      getMissingValue={getMissingValue}
                    />
                  ) : (
                    <></>
                  )}
                </div>

                <div className={styles.data_chart}>
                  <div className={styles.data_type}>
                    <div>CHART(Missing Value)</div>
                    <div>
                      <FaSistrix />
                    </div>
                  </div>
                  {getDataName && getDataValue != undefined ? (
                    <ChartComponent
                      dataName={getDataName}
                      getMissingValue={getMissingValue}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
