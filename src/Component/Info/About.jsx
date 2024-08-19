import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Container>
        <h2 className="text-center mb-5">About NapCare</h2>
        <Row>
          <Col
            md={5}
            className="d-flex justify-content-center align-item-center mb-5"
          >
            <img
              src="asset/designing3.png"
              alt="Loading"
              style={{ height: "650px", width: "550px", borderRadius: "15px" }}
            />
          </Col>
          <Col md={7}>
            <p style={{ paddingLeft: "20px", textAlign: "justify" }}>
              <b>Welcome</b> to NapCare, your ultimate destination for
              everything related to restful sleep and rejuvenating naps. At
              NapCare, we believe that quality rest is the cornerstone of a
              healthy and fulfilling life. Our mission is to delve into the
              science and art of sleep, providing you with expert tips,
              insightful articles, and practical advice to help you achieve the
              perfect slumber.
              <br />
              <br />
              We understand that in today's fast-paced world, quality sleep is
              often overlooked. Whether you're struggling with insomnia, looking
              to improve your nightly sleep routine, or simply curious about the
              benefits of a power nap, NapCare is here to guide you every step
              of the way. Our comprehensive resources are designed to help you
              embrace the power of rest, ensuring you wake up to a healthier,
              more energized you.
              <br />
              At NapCare, we cover a wide range of topics including:
              <ul className="mt-3">
                <li>
                  Sleep Science: Discover the latest research on sleep cycles,
                  circadian rhythms, and how they affect your health and
                  well-being.
                </li>
                <li>
                  Sleep Tips: Learn practical strategies for improving your
                  sleep hygiene, from creating the ideal sleep environment to
                  developing a consistent bedtime routine.
                </li>
                <li>
                  Power Naps: Uncover the benefits of short naps and how they
                  can boost your productivity and mood.
                </li>
                <li>
                  Sleep Disorders: Get informed about common sleep disorders,
                  their symptoms, and available treatments.
                </li>
                <li>
                  Product Reviews: Find reviews of the best sleep products, from
                  mattresses and pillows to sleep trackers and relaxation aids.
                </li>
              </ul>
              Join our community of sleep enthusiasts and experts who are
              passionate about the transformative power of rest. At NapCare, we
              are dedicated to helping you optimize your sleep so you can lead a
              healthier, more vibrant life. Embrace the journey to better sleep
              with us, and wake up refreshed and ready to seize the day.
              <br />
              <br />
              Welcome to NapCare—where every nap counts and every night's sleep
              is a step towards a better you.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
