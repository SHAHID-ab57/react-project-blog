import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <Container className="about-container">
      <h2 className="text-center about-title mb-5">About NapCare</h2>
      <Row className="align-items-center">
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center mb-5"
        >
          <img
            src="asset/designing3.png"
            alt="NapCare Illustration"
            className="about-image"
          />
        </Col>
        <Col md={7}>
          <p className="about-text">
            <strong>Welcome</strong> to NapCare, your ultimate destination for
            everything related to restful sleep and rejuvenating naps. At
            NapCare, we believe that quality rest is the cornerstone of a
            healthy and fulfilling life. Our mission is to delve into the
            science and art of sleep, providing you with expert tips, insightful
            articles, and practical advice to help you achieve the perfect
            slumber.
            <br />
            <br />
            We understand that in today's fast-paced world, quality sleep is
            often overlooked. Whether you're struggling with insomnia, looking
            to improve your nightly sleep routine, or simply curious about the
            benefits of a power nap, NapCare is here to guide you every step of
            the way. Our comprehensive resources are designed to help you
            embrace the power of rest, ensuring you wake up to a healthier, more
            energized you.
            <br />
            At NapCare, we cover a wide range of topics including:
          </p>
          <ul className="about-list mt-3">
            <li>
              <strong>Sleep Science:</strong> Discover the latest research on
              sleep cycles, circadian rhythms, and how they affect your health
              and well-being.
            </li>
            <li>
              <strong>Sleep Tips:</strong> Learn practical strategies for
              improving your sleep hygiene, from creating the ideal sleep
              environment to developing a consistent bedtime routine.
            </li>
            <li>
              <strong>Power Naps:</strong> Uncover the benefits of short naps
              and how they can boost your productivity and mood.
            </li>
            <li>
              <strong>Sleep Disorders:</strong> Get informed about common sleep
              disorders, their symptoms, and available treatments.
            </li>
            <li>
              <strong>Product Reviews:</strong> Find reviews of the best sleep
              products, from mattresses and pillows to sleep trackers and
              relaxation aids.
            </li>
          </ul>
          <p className="about-text">
            Join our community of sleep enthusiasts and experts who are
            passionate about the transformative power of rest. At NapCare, we
            are dedicated to helping you optimize your sleep so you can lead a
            healthier, more vibrant life. Embrace the journey to better sleep
            with us, and wake up refreshed and ready to seize the day.
            <br />
            <br />
            <strong>Welcome to NapCare</strong>—where every nap counts and every
            night's sleep is a step towards a better you.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
