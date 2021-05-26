score_leftWrist = 0;
song = "";
leftWristX = 0;
lefttWristY = 0;
rightWristX = 0;
rightWrsitY = 0;
function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("modelLoaded");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#000000');
    if(score_leftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
      if(results.length>0)
      {
          console.log(results);
           
           score_leftWrist = results[0].pose.keypoints[9].score;
           console.log("score_leftWrist = " + score_leftWrist);

          leftWristX = results[0].pose.leftWrist.x;
          leftWristY = results[0].pose.leftWrist.y;
          console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

          console.log(results);
          rightWristX = results[0].pose.rightWrist.x;
          rightWristY = results[0].pose.rightWrist.y;
          console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
      }
}