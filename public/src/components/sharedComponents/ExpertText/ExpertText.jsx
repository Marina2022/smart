import s from './ExpertText.module.scss'
import React from "react";

const ExpertText = ({expert, classname}) => {
  return (
    <div className={classname}>

      <h3 className={s.title}>
        About expert
      </h3>
      <p className={s.text}>
        {expert.experience}
      </p>

      <h3 className={s.title}>
        Courses
      </h3>
      <p className={s.text}>
        {expert.learnDescription}
      </p>
    </div>
  );
};

export default ExpertText;
