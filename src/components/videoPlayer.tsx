interface Props {
  url: string;
}

export default function VideoPlayer({url}: Props) {

  return (
    <div>
        <video controls width="600">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  );
}