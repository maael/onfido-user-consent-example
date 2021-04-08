import dynamic from 'next/dynamic';

const Onfido = dynamic(async () => import('../component/Onfido'), {
  loading: () => <div>Loading</div>,
  ssr: false,
});

export default function Index () {
  return (
    <div>
      <Onfido />
    </div>
  )
}