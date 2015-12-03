# Discovery-Block

This project proposes a goal-oriented platform able to perform a set of task necessary to achieve the request expressed by user.

The proposed scenario is constituted by an intelligent environment in which they are immersed several smart objects.

This platform is a middleware between user and smart object. Users express their request in form of goal. The platform understand the request and coordinates the action of smart object.

The platform is made of serveral parts: Undertanding Block, Task Coordinator, Discovery Block, Target Block, SmartHome-Application-Client.

This module receive query in N3 format and returns a json that satisfies the query. It use EYE Reasoner.

It requires Node.js, Mongo DB and EYE installed. 
Install the system with command npm install. 
Run the system with command "node server".
