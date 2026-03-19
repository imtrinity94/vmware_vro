/**
 * Simple task with custom script capability.
 *
 * @param {LenovoXClarityIntegrator:XClarityServer} xClarityServer
 * @return {LenovoXClarityIntegrator:XClarityAdministrator} lxca
 */
if(xClarityServer)
{
    lxca=xClarityServer.getXClarityAdministrator();
}