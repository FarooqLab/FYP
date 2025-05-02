import React from "react";
import Accordion from "react-bootstrap/Accordion";

const FAQ = () => {
  return (
    <div className="bg-[#2c7172] text-center" id="faq">
      <h1>FAQ's</h1>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6 className="font-semibold">
              What is FitNurish and how can it help me?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            FitNurish is a personalized fitness and nutrition platform designed
            to help you achieve your health goals. By calculating your BMI and
            BMR, it suggests customized workout plans and diet recommendations
            that suit your body type and goals—whether it's weight loss, gain,
            or maintenance.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h6 className="font-semibold">
              Do I need to create an account to use FitNurish?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            Yes, to fully access the personalized features like BMI/BMR
            tracking, exercise plans, and meal planning, you'll need to create
            an account. This helps us save your progress and tailor
            recommendations just for you.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h6 className="font-semibold">
              {" "}
              How is my meal or exercise plan generated?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            Your plans are generated based on your BMI and BMR scores. After you
            input your age, weight, height, and gender, FitNurish calculates
            your needs and offers suggestions accordingly. You can also input
            available foods or exercises to receive customized plans.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <h6 className="font-semibold">
              What exercises should normal BMI individuals follow?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            If you have a normal BMI (typically between 18.5 and 24.9), your
            focus should be on maintaining your current weight, building
            strength, and improving overall fitness. A balanced routine can
            include: Cardio: Running, swimming, cycling, or brisk walking (3–5
            times a week) Strength Training: Bodyweight exercises, resistance
            bands, or light weightlifting (2–3 times a week) Flexibility &
            Balance: Yoga or stretching sessions (2–3 times a week) The goal is
            to stay active, maintain lean muscle mass, and support long-term
            health.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <h6 className="font-semibold">
              Which exercises are best for overweight individuals?
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            For individuals with a BMI above 25, the aim is often to reduce
            weight safely while building endurance and strength. Recommended
            exercises include: Low-Impact Cardio: Walking, swimming, stationary
            biking, or elliptical workouts (start with 20–30 minutes daily)
            Strength Training: Light weights or resistance bands to build muscle
            and boost metabolism (2–3 times a week) Flexibility & Joint Support:
            Gentle yoga or stretching to improve mobility and prevent injuries
            Always start slow, focus on consistency, and increase intensity
            gradually. FitNurish tailors these plans based on your current BMI
            and progress.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQ;
