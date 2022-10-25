import React from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Logo from '@site/static/img/logo.svg';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';

const features = [
  {
    title: 'Easy to Use',
    image: require('@site/static/img/feature_easy_to_use.png').default,
    description: <>Install the packages, import the components and you're done! That's it, no time wasted.</>,
  },
  {
    title: 'Customizable',
    image: require('@site/static/img/feature_customizable.png').default,
    description: (
      <>
        React Bulk allow you to customize all components and its defaults using theme. <b>You own your design!</b>
      </>
    ),
  },
  {
    title: 'Web and Native',
    image: require('@site/static/img/feature_web_native.png').default,
    description: (
      <>
        Same design system, same components, same code, same <b>EVERYTHING</b> on your Web and Native applications.
      </>
    ),
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.tagline}`} description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          {/*<h1 className="hero__title">{siteConfig.title}</h1>*/}

          <h1 className="hero__title">
            <Logo className={styles.heroLogo} alt={siteConfig.title} />
          </h1>

          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>

          <div className={styles.buttons}>
            <Link className="button button--lg" to="/docs/category/getting-started">
              ⇉ Getting Started
            </Link>
            <Link className="button button--lg" to="/docs/category/components">
              ䷳ Components
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map(({ image, title, description }, index) => (
                <div key={index} className={clsx('col col--4')}>
                  <div className="text--center">
                    <img className={styles.featureImg} src={image} />
                  </div>
                  <div className="text--center padding-horiz--md">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
