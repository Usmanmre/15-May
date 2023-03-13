import '../CSS/Trending_Query.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'

import {Container, Col, Row} from 'react-bootstrap';

function Trending_Query() {
  return (
    <Container className='con '>
        <div className='trending-sec'>
        <div className='mb-2'>
        <div className='d-inline-block ps-4 pt-2'><FontAwesomeIcon className='me-2' icon = {faBoltLightning} /></div>
        <div className='d-inline-block'> <p className='heading mb-1'>Top Trending Queries</p></div>
        </div>
        <div className='queries'>
          <p> Nisi ad tempor incididunt commodo in reprehenderit et consequat duis sit non mollit officia cillum.</p>
          <p>Eu aute anim commodo culpa et qui do et proident non proident aute dolore.</p>
          <p> Et deserunt qui Lorem excepteur qui consectetur laboris id dolore consectetur nostrud est esse.</p>
          <p>Eu aute anim commodo culpa et qui do et proident non proident aute dolore.</p>
          <p> Nisi ad tempor incididunt commodo in reprehenderit et consequat duis sit non mollit officia cillum.</p>
          <p> Et deserunt qui Lorem excepteur qui consectetur laboris id dolore consectetur nostrud est esse.</p>
        </div>
        </div>
    </Container>
  );
}

export default Trending_Query;
