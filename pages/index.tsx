import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Index.module.css";
import { FaLock, FaStar, FaRocket, FaPlus } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircleXmark, FaAlignJustify } from "react-icons/fa6";

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

  useEffect(() => {
    getAllData();
  }, []);

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

  const pickProject = async (num: number) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://3.36.0.92:8888/analysis/dataList",
        data: {
          projectConfigId: num,
        },
      });
      console.log(response);
    } catch (error) {
      console.log("error : ", error);
    }
  };

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
      } else {
        console.error("데이터 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
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
                  {userProject.projectName}
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
        <div className={styles.project_tab_closed}></div>
      </div>

      <div className={styles.index_wrap}>
        <Link legacyBehavior href="https://kr.wandb.ai/">
          <a target="_blank">
            <img src="/images/aaa.jpg" />
          </a>
        </Link>
      </div>
    </>
  );
}
