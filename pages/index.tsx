import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Index.module.css";
import { FaLock, FaStar, FaRocket, FaPlus, FaFilter } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegCircleXmark,
  FaAlignJustify,
  FaAnglesLeft,
  FaRectangleList,
  FaArrowDownWideShort,
} from "react-icons/fa6";

export default function Home() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [getProject, setGetProject]: any = useState([]);
  const [projectInfo, setProjectInfo]: any = useState([]);
  const [projectDetail, setProjectDetail] = useState<boolean>(false);

  const [pickedOne, setPickedOne]: any = useState([]);
  type userProject = {
    description: string;
    fileName: string;
    filePath: string;
    projectConfigid: number;
    projectName: string;
    userId: number;
  };

  type projectInfos = {
    dataId: number;
    fileName: string;
    filePath: string;
    projectConfigid: number;
  };

  useEffect(() => {
    getAllData();
  }, []);
  /////////////////////////////////////////////////////////////
  //처음 Myproject 데이터 가져오기
  const getAllData = async () => {
    try {
      const response = await axios.get(
        "http://3.36.0.92:8888/analysis/projectSearch"
      );
      setGetProject(response.data);
    } catch (error) {
      console.error("에러사항: ", error);
    }
  };
  //처음 Myproject 데이터 가져오기
  /////////////////////////////////////////////////////////////
  // create New project
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
      } else {
        console.error("데이터 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };
  // create project
  /////////////////////////////////////////////////////////////
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
      setProjectInfo([response.data[0]]);
      console.log(projectInfo);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  // my project 클릭했을떄
  /////////////////////////////////////////////////////////////
  // tab에있는데이터클릭
  const getProjectData = async (dataId: number) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://3.36.0.92:8888/analysis/dataPreview",
        params: {
          dataId: dataId,
        },
      });

      console.log(response);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  // tab에있는데이터클릭
  /////////////////////////////////////////////////////////////
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
      <div className={styles.nav_wrap}>
        <Link legacyBehavior href="/">
          <a className={styles.to_home}>HOME</a>
        </Link>
        <dl>
          <dt>My Projects</dt>
          <dd>
            <FaLock style={{ marginRight: "10px" }} />
            User/Project-name
          </dd>
          <dd>
            {getProject != undefined ? (
              getProject.map((userProject: userProject, idx: number) => (
                <div
                  key={idx}
                  onClick={() => {
                    pickProject(userProject.projectConfigid);
                    setProjectDetail(true);
                  }}
                >
                  <FaAlignJustify style={{ marginRight: "10px" }} />
                  <span>{userProject.projectName}</span>
                </div>
              ))
            ) : (
              <></>
            )}
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
      <div
        className={`${styles.project_tab_closed} ${
          projectDetail ? styles.on : ""
        }`}
      >
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
                          setProjectInfo([]);
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
                <div className={styles.project_name}>프로젝트 네임</div>
                <div className={styles.project_file}>
                  {projectInfo != undefined ? (
                    projectInfo.map((info: projectInfos, idx: number) => (
                      <div key={idx}>
                        <div
                          className={styles.project_info}
                          onClick={() => {
                            getProjectData(info.dataId);
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
      <div className={styles.index_wrap}>
        <Link legacyBehavior href="https://kr.wandb.ai/">
          <a target="_blank">
            <img src="/images/aaa.png" alt="프로필 이미지" />
          </a>
        </Link>
      </div>
    </>
  );
}
