import React from 'react';

import Layout from '../components/Layout';
import sections from '../components/sections'

// import { Link } from 'gatsby';
import Sidebar from '../components/Sidebar';
import config from '../../config';

const IndexPage = () => (
  <Layout>
    <Sidebar />
    <div className="container-fluid p-0">
      {sections.map(({id, Component}) => (
        <>
        <section
          key={id}
          id={id}
          className="resume-section p-3 p-lg-5 d-flex align-items-center"
        >
          <div className="w-100">
            <Component {...config}/>
          </div>
        </section>
        <hr className="m-0"/>
        </>
      ))}
    </div>
  </Layout>
);

export default IndexPage;
