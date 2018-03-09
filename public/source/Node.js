////////////////////////////////////
// Graph node.
//

"use strict";

// Define universal constants:
const HOOKE_CONSTANT = 0.001;
const COULOMB_CONSTANT = 4000;
const DRAG_CONSTANT = -0.01;
const ANIMATION_SPEED_CONSTANT = 10;

class Node {

    // Render the node to the context.
    render(context, nodeBasis) {

        // Draw a circle.
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.x - nodeBasis.position.x,
            this.position.y - nodeBasis.position.y,
            this.radius,
            0,
            2 * Math.PI);
        context.fill();
    }

    // Compute the net force between this node and all its configured children.
    computeNetForce() {

        // Reset force each frame with a drag calculation.
        let objectForce = {

            x: this.velocity.x * DRAG_CONSTANT,
            y: this.velocity.y * DRAG_CONSTANT
        };

        // Process Coulomb repulsion.
        this.coulombChildren.forEach((nodeChild) => {

            let dTheta = Math.atan2(this.position.y - nodeChild.position.y,
                this.position.x - nodeChild.position.x);

            let dDistance = Math.sqrt(Math.pow(nodeChild.position.y - this.position.y, 2) +
                Math.pow(nodeChild.position.x - this.position.x, 2));

            let dCoulombMagnitude = COULOMB_CONSTANT * this.charge * nodeChild.charge / Math.pow(dDistance, 2);
            let dCoulombX = dCoulombMagnitude * Math.cos(dTheta);
            let dCoulombY = dCoulombMagnitude * Math.sin(dTheta);

            objectForce.x += dCoulombX;
            objectForce.y += dCoulombY;
        });

        // Now, calculate attractvie, Hooke force.
        this.hookeChildren.forEach((nodeChild) => {

            let dTheta = Math.atan2(nodeChild.position.y - this.position.y,
                nodeChild.position.x - this.position.x);

            let dDistance = Math.sqrt(Math.pow(nodeChild.position.y - this.position.y, 2) +
                Math.pow(nodeChild.position.x - this.position.x, 2));

            let dHookeMagnitude = HOOKE_CONSTANT * dDistance;
            let dHookeX = dHookeMagnitude * Math.cos(dTheta);
            let dHookeY = dHookeMagnitude * Math.sin(dTheta);

            objectForce.x += dHookeX;
            objectForce.y += dHookeY;
        });

        // Store the net force with the node.
        this.force = {

            x: objectForce.x,
            y: objectForce.y
        };
    }

    // Compute the updated position of the node, given the net force.
    computePosition(dFrameSeconds) {

        // First, cacluate acceleration.
        let objectAcceleration = {

            x: this.force.x / this.mass,
            y: this.force.y / this.mass
        };
        // Normalize acceleration if magnitude > 1.
        let dAccelerationMagnitude = Math.sqrt(Math.pow(objectAcceleration.x, 2) +
            Math.pow(objectAcceleration.y, 2));
        if (dAccelerationMagnitude > 1.0) {

            objectAcceleration = {

                x: objectAcceleration.x / dAccelerationMagnitude,
                y: objectAcceleration.y / dAccelerationMagnitude,
            }
        }

        // Now, calculate velocity.
        this.velocity = {

            x: this.velocity.x + objectAcceleration.x,
            y: this.velocity.y + objectAcceleration.y
        }

        // Scale the velocity for the time since the last frame.
        let objectScaledVelocity = {

            x: this.velocity.x * dFrameSeconds * ANIMATION_SPEED_CONSTANT,
            y: this.velocity.y * dFrameSeconds * ANIMATION_SPEED_CONSTANT
        }
        // Normalize scaled velocity if magnitude > 1.
        let dAccelerationScaledVelocity = Math.sqrt(Math.pow(objectScaledVelocity.x, 2) +
            Math.pow(objectScaledVelocity.y, 2));
        if (dAccelerationScaledVelocity > 1.0) {

            objectScaledVelocity = {

                x: objectScaledVelocity.x / dAccelerationScaledVelocity,
                y: objectScaledVelocity.y / dAccelerationScaledVelocity,
            }
        }

        // Finally, update position.
        this.position = {

            x: this.position.x + objectScaledVelocity.x,
            y: this.position.y + objectScaledVelocity.y
        };
    }

    // Color.
    get color() {

        if (this.m_strColor === undefined) {

            this.m_strColor = "yellow";
        }
        return this.m_strColor;
    }
    set color(strValue) {

        this.m_strColor = strValue;
    }

    // Position.
    get position() {

        if (this.m_dX === undefined) {

            this.m_dX = 0;
        }
        if (this.m_dY === undefined) {

            this.m_dY = 0;
        }
        return {

            x: this.m_dX,
            y: this.m_dY
        };
    }
    set position(objectValue) {

        this.m_dX = objectValue.x;
        this.m_dY = objectValue.y;
    }

    // Force.
    get force() {

        if (this.m_dForceX === undefined) {

            this.m_dForceX = 0;
        }
        if (this.m_dForceY === undefined) {

            this.m_dForceY = 0;
        }
        return {

            x: this.m_dForceX,
            y: this.m_dForceY
        };
    }
    set force(objectValue) {

        this.m_dForceX = objectValue.x;
        this.m_dForceY = objectValue.y;
    }

    // Acceleration.
    get acceleration() {

        if (this.m_dAccelerationX === undefined) {

            this.m_dAccelerationX = 0;
        }
        if (this.m_dAccelerationY === undefined) {

            this.m_dAccelerationY = 0;
        }
        return {

            x: this.m_dAccelerationX,
            y: this.m_dAccelerationY
        };
    }
    set acceleration(objectValue) {

        this.m_dAccelerationX = objectValue.x;
        this.m_dAccelerationY = objectValue.y;
    }

    // Velocity.
    get velocity() {

        if (this.m_dVelocityX === undefined) {

            this.m_dVelocityX = 0;
        }
        if (this.m_dVelocityY === undefined) {

            this.m_dVelocityY = 0;
        }
        return {

            x: this.m_dVelocityX,
            y: this.m_dVelocityY
        };
    }
    set velocity(objectValue) {

        this.m_dVelocityX = objectValue.x;
        this.m_dVelocityY = objectValue.y;
    }

    // Radius.
    get radius() {

        if (this.m_dRadius === undefined) {

            this.m_dRadius = 20;
        }
        return this.m_dRadius;
    }
    set radius(dValue) {

        this.m_dRadius = dValue;
    }

    // Mass.
    get mass() {

        if (this.m_dMass === undefined) {

            this.m_dMass = 1.0;
        }
        return this.m_dMass;
    }
    set mass(dValue) {

        this.m_dMass = dValue;
    }

    // charge.
    get charge() {

        if (this.m_dCharge === undefined) {

            this.m_dCharge = 1.0;
        }
        return this.m_dCharge;
    }
    set charge(dValue) {

        this.m_dCharge = dValue;
    }

    // Collection of children for Hooke force.
    get hookeChildren() {

        if (!this.m_arrayHookeChildren) {

            this.m_arrayHookeChildren = [];
        }
        return this.m_arrayHookeChildren;
    }

    // Collection of children for Coulomb force.
    get coulombChildren() {

        if (!this.m_arrayCoulombChildren) {

            this.m_arrayCoulombChildren = [];
        }
        return this.m_arrayCoulombChildren;
    }
}