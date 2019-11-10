import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import '../../scss/components/gitlist.scss'
import gituser from '../../images/gituser.jpeg'

const getUsers = user => (
  `https://api.github.com/search/users?q=${user}`
)

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  fetchGitData = async (usr) => {
    const response = await fetch(getUsers(usr))
    return (
      await response.json()
        .then(data => this.setState({data}))
    )
  }

  render() {
    const {data:{items}} = this.state
    console.log(this.state.data)


    return (
      <>
        <Header
          fetchGitData={this.fetchGitData}
        />
        <main>

          <div id='main-content'>
            <div className='maincenter'>
              <div className='gitinner'>
                <div className='git-row'>

                  <div className="git-item">
                    <div className="gitblock">

                      <div className="gitimage ">
                        <span className="gitlabel">
                          <span>User</span>
                        </span>
                        <div className="gitflip">
                          <a href="" className="gitflip-image">
                            <img src={gituser} alt='' width='460' height='460' />
                          </a>
                        </div>
                        <a href="" className='gitflip-text'>
                          <span>View User</span>
                        </a>
                      </div>

                      <div className="gitinfo">
                        <div className="left">
                          <h3 className="name">
                            iPhone 5s 64 GB
                          </h3>
                          <div className="price">
                            <span className="price-old">$119.50</span>
                            <span className="price-tax">Ex Tax: $90.00</span>
                          </div>
                        </div>

                        <div className="right">
                          <p class="description">
                            Lorem Ipsum is simply dummy
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                   <div className="git-item">
                    <div className="gitblock">

                      <div className="gitimage ">
                        <span className="gitlabel">
                          <span>User</span>
                        </span>
                        <div className="gitflip">
                          <a href="" className="gitflip-image">
                            <img src={gituser} alt='' width='460' height='460' />
                          </a>
                        </div>
                        <a href="" className='gitflip-text'>
                          <span>View User</span>
                        </a>
                      </div>

                      <div className="gitinfo">
                        <div className="left">
                          <h3 className="name">
                            iPhone 5s 64 GB
                          </h3>
                          <div className="price">
                            <span className="price-old">$119.50</span>
                            <span className="price-tax">Ex Tax: $90.00</span>
                          </div>
                        </div>

                        <div className="right">
                          <p class="description">
                            Lorem Ipsum is simply dummy
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                   <div className="git-item">
                    <div className="gitblock">

                      <div className="gitimage ">
                        <span className="gitlabel">
                          <span>User</span>
                        </span>
                        <div className="gitflip">
                          <a href="" className="gitflip-image">
                            <img src={gituser} alt='' width='460' height='460' />
                          </a>
                        </div>
                        <a href="" className='gitflip-text'>
                          <span>View User</span>
                        </a>
                      </div>

                      <div className="gitinfo">
                        <div className="left">
                          <h3 className="name">
                            iPhone 5s 64 GB
                          </h3>
                          <div className="price">
                            <span className="price-old">$119.50</span>
                            <span className="price-tax">Ex Tax: $90.00</span>
                          </div>
                        </div>

                        <div className="right">
                          <p class="description">
                            Lorem Ipsum is simply dummy
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                   <div className="git-item">
                    <div className="gitblock">

                      <div className="gitimage ">
                        <span className="gitlabel">
                          <span>User</span>
                        </span>
                        <div className="gitflip">
                          <a href="" className="gitflip-image">
                            <img src={gituser} alt='' width='460' height='460' />
                          </a>
                        </div>
                        <a href="" className='gitflip-text'>
                          <span>View User</span>
                        </a>
                      </div>

                      <div className="gitinfo">
                        <div className="left">
                          <h3 className="name">
                            iPhone 5s 64 GB
                          </h3>
                          <div className="price">
                            <span className="price-old">$119.50</span>
                            <span className="price-tax">Ex Tax: $90.00</span>
                          </div>
                        </div>

                        <div className="right">
                          <p class="description">
                            Lorem Ipsum is simply dummy
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        <Footer />

      </>
    )

  }

}

export default Layout
