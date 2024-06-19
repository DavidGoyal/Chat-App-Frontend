/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async'

const Title = ({title="Chat App",description="this is a Chat App"}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title