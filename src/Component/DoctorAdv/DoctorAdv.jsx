import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const DoctorAdv = () => {
  return (
    <>
      <Container>
        <h2 className="text-center mb-5">Dr. Jane Thompson on Sleep</h2>

        <Row>
          <Col md={6}>
            <Image src="asset/whatdoctor.jpg" fluid />
            <Image
              src="asset/2BB4A80C00000578-3212781-A_new_study_has_found_that_patients_are_not_at_higher_risk_of_su-a-3_1440675492094.jpg"
              fluid
              className="mt-5"
            />
            <Image
              src="asset/sleep-medicine-doctor-with-patient.jpg"
              fluid
              className="mt-5"
            />
          </Col>
          <Col md={6}>
            <div>
              <h3>Dr. Jane Thompson's Thoughts on Sleep:</h3>

              <p>
                Dr. Jane Thompson is a renowned sleep specialist with over 20
                years of experience in the field of sleep medicine. She has
                dedicated her career to understanding the complexities of sleep
                and its impact on overall health.
              </p>
              <br />

              <p>
                <b>The Good:</b>{" "}
              </p>
              <br />

              <p>
                "Quality sleep is essential for maintaining optimal health and
                well-being. A good night's sleep helps to improve memory, boosts
                mood, and supports physical health. During sleep, the body
                repairs tissues, builds muscle, and strengthens the immune
                system. Consistently getting 7-9 hours of sleep per night can
                enhance cognitive function, increase productivity, and improve
                overall quality of life."
              </p>
              <br />
              <p>
                <b>The Bad:</b> <br />
                "On the other hand, poor sleep can have significant negative
                effects. Sleep deprivation can lead to cognitive impairments,
                such as difficulty concentrating, memory lapses, and decreased
                problem-solving skills. It also increases the risk of chronic
                conditions like obesity, diabetes, cardiovascular disease, and
                even mental health disorders like anxiety and depression.
                Chronic sleep deprivation can weaken the immune system, making
                one more susceptible to infections and illnesses. It's crucial
                to prioritize sleep and maintain a consistent sleep schedule to
                avoid these adverse health effects."
              </p>

              <br />
              <br />

              <h4>Dr. Jane Thompson's Advice:</h4>

              <p>
                "To achieve better sleep, create a relaxing bedtime routine,
                limit exposure to screens before bed, and ensure your sleep
                environment is comfortable and conducive to rest. Avoid caffeine
                and heavy meals close to bedtime, and try to stick to a regular
                sleep schedule, even on weekends. By making sleep a priority,
                you can significantly improve your health and overall quality of
                life."
              </p>
              <br />

              <p>
                <b>Conclusion:</b> <br />
                <br />
                Dr. Jane Thompson emphasizes the importance of good sleep
                hygiene and its profound impact on our physical and mental
                health. Prioritizing sleep can lead to a happier, healthier
                life, while neglecting it can have serious repercussions.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorAdv;
