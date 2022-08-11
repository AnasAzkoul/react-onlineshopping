import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='about'/>
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
            <p>
              Sunt incididunt cupidatat id amet excepteur aliqua nostrud id reprehenderit eiusmod pariatur voluptate non. Occaecat ullamco ex consectetur nulla eu consectetur consequat non in. Minim et eiusmod occaecat adipisicing id exercitation ullamco enim deserunt eu pariatur fugiat. Adipisicing culpa esse sit eu non sint et ea. Ipsum non est occaecat adipisicing non eu do minim duis aute. Culpa esse cupidatat non reprehenderit in consectetur laboris culpa exercitation elit. Sunt commodo non voluptate consequat pariatur Lorem ipsum tempor exercitation officia aliquip id excepteur ad.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
