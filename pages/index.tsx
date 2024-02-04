import Head from "next/head";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { FaLock, FaStar, FaRocket, FaPlus, FaFilter } from "react-icons/fa";
import {
  FaRegCircleXmark,
  FaAlignJustify,
  FaAnglesLeft,
  FaRectangleList,
  FaArrowDownWideShort,
} from "react-icons/fa6";
import axios from "axios";
import styles from "@/styles/Index.module.css";
import Link from "next/link";
import ChartComponent from "./components/chart";

export default function Home() {
  const [getProject, setGetProject] = useState<any>(null);
  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [projectInfo, setProjectInfo]: any = useState(undefined);
  const [getDataName, setGetDataName]: any = useState(undefined);
  const [getDataValue, setGetDataValue]: any = useState(undefined);

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

  return (
    <>
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

        <div className={styles.contents}>
          <div className={styles.data_visual}>
            <div className={styles.data_type}>TABLE</div>
            {getDataName && getDataValue != undefined ? (
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
                                    {row[column] !== null ? row[column] : "N/A"}
                                  </td>
                                )
                              )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className={styles.data_type}>CHART</div>

            {getDataName && getDataValue != undefined ? (
              // 다되면
              // <ChartComponent dataName={getDataName} dataValue={평균값넣은배열}/>
              //conponents -> chart.tsx로 이동...
              <ChartComponent dataName={getDataName} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
