import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Index.module.css";
import { FaLock, FaStar, FaRocket, FaPlus } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import Head from "next/head";
export default function Home() {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedFile, setSelectedFile]: any = useState(null);

  const onNewProject = () => {
    setCreateModal(true);
  };

  const onChangeProjectName = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProjectName(value);
    console.log(projectName);
  };

  const onChangeProjectDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setProjectDescription(value);
    console.log(projectDescription);
  };

  const onFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("projectName", projectName);
      formData.append("description", projectDescription);
      formData.append("projectData", selectedFile);
      const response = await fetch(
        "http://3.36.0.92:9999/analysis/newProject",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("데이터가 성공적으로 전송되었습니다.");
      } else {
        console.error("데이터 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <div className={styles.create_modal}>
        <form className={styles.create_form} onSubmit={onSubmit}>
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
          <dd onClick={onNewProject}>
            <FaPlus style={{ marginRight: "10px" }} />
            Create New Project
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
