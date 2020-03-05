#!/bin/bash
SKELETON="{
\"dcacheRunning\" : $RANDOM,
\"generaCompleted\" :$RANDOM,
\"generaContainerCreating\" :$RANDOM,
\"generaError\" :$RANDOM,
\"generaPending\" :$RANDOM,
\"generaRunning\" :$RANDOM,
\"publisError\" :$RANDOM,
\"publisPending\" :$RANDOM,
\"refresCompleted\" :$RANDOM,
\"refresContainerCreating\" :$RANDOM,
\"refresPending\" :$RANDOM,
\"refresRunning\" : $RANDOM,
\"unpublCompleted\" :$RANDOM,
\"webchaRunning\" :$RANDOM
}"

echo $SKELETON
